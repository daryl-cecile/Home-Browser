
HomeBrowser.Support.log('STARTUP','Starting HomeBrowser system','startup' , 0);

let isFirstRun = HomeBrowser.IO.init(); // create files if they dont already exist

HomeBrowser.Security.createSessionCache(); // create folder to store session items


if ( ! isFirstRun ){

    // load browser settings
    HomeBrowser.Settings = JSON.parse(HomeBrowser.IO.Config.readCoreConfig(HomeBrowser.IO.HomeBrowserPaths.file_paths.HomeBrowserDefaultSettings));

    // load user settings
    let userSettings = JSON.parse(HomeBrowser.IO.Config.readCoreConfig(HomeBrowser.IO.HomeBrowserPaths.file_paths.HomeBrowserUserSettings));

    Object.keys(userSettings.general).forEach(generalItem=>{
        HomeBrowser.Settings.general[generalItem] = userSettings.general[generalItem];
    });
    Object.keys(userSettings.search).forEach(searchItem=>{
        HomeBrowser.Settings.search[searchItem] = userSettings.search[searchItem];
    });
    Object.keys(userSettings.security).forEach(securityItem=>{
        HomeBrowser.Settings.security[securityItem] = userSettings.security[securityItem];
    });

    HomeBrowser.Preferences = userSettings;

}
else{

    // write default browser settings

    let defaultBrowserSettings:HomeBrowser.ISettings = {

        general:{
            showLastSession:false,
            showNewTab:true,
            newTabURL:"home://new_tab/",
            downloadFolder: HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserDownloads
        },
        search:{
            searchEngine:"Google|https://www.google.co.uk/search?q=${query}&ie=utf-8&oe=utf-8&client=Home"
        },
        security:{
            javascriptEnabled: true,
            extensionsEnabled: true,
            onPermissionRequests: 'ask'
        }

    };

    HomeBrowser.Settings = defaultBrowserSettings;

    HomeBrowser.IO.Config.writeCoreConfig( HomeBrowser.IO.HomeBrowserPaths.file_paths.HomeBrowserDefaultSettings , JSON.stringify(defaultBrowserSettings, null, '\t'));

}

document.querySelector('[data-do="downloads"]').addEventListener('click', ()=>{
    HomeBrowser.Broadcaster.broadcast('toggle','downloads');
    HomeBrowser.Broadcaster.broadcast('tab info','update');
} );

document.querySelector('[data-do="back"]').addEventListener('click', ()=>{
    HomeBrowser.Broadcaster.broadcast('nav','back');
    HomeBrowser.Broadcaster.broadcast('tab info','update');
} );
document.querySelector('[data-do="forward"]').addEventListener('click', ()=>{
    HomeBrowser.Broadcaster.broadcast('nav','forward');
    HomeBrowser.Broadcaster.broadcast('tab info','update');
});
document.querySelector('[data-do="refresh"]').addEventListener('click',()=>{
    if ( HomeBrowser.Key.isPressed('meta') ){
        HomeBrowser.Broadcaster.broadcast('nav','refresh');
        HomeBrowser.Broadcaster.broadcast('tab info','update');
    }
    else{
        HomeBrowser.Broadcaster.broadcast('nav','reload');
        HomeBrowser.Broadcaster.broadcast('tab info','update');
    }
});
document.querySelector('[data-do="new_tab"]').addEventListener('click',()=>{
    HomeBrowser.Broadcaster.broadcast('create new tab');
});
document.querySelector('input[type="text"]').addEventListener('keyup',(evt:KeyboardEvent) => {
    if ( evt.keyCode === 13 ){
        let inputbox = (<HTMLTextAreaElement>document.querySelector('input[type="text"]'));
        HomeBrowser.Broadcaster.broadcast('nav goto', inputbox.value );
        HomeBrowser.Broadcaster.broadcast('tab info','update');
        inputbox.blur();
        HomeBrowser.Broadcaster.broadcast('empty suggestion');
        HomeBrowser.Visual.restoreTheme(true);
    }
    else{
        HomeBrowser.Broadcaster.broadcast('populate suggestions', (<HTMLTextAreaElement>document.querySelector('input[type="text"]')).value );
    }
});

setInterval(()=>{

        let hvalue = (<HTMLDivElement>document.querySelector('.search .url-helper'));
        let ivalue = (<HTMLInputElement>document.querySelector('.search input')).value.replace(/&amp;/g, "&");
        if (hvalue.textContent.replace(/&amp;/g, "&") != (ivalue)){

            if ( HomeBrowser.URL.isURL(ivalue) ){
                hvalue.innerHTML = HomeBrowser.URL.blockifyURL(ivalue);
            }
            else{
                hvalue.innerHTML = ivalue;
            }

        }

},400);

HomeBrowser.Broadcaster.on('set navbar raw value',(rawValue)=>{
    (<HTMLTextAreaElement>document.querySelector('input[type="text"]')).value = rawValue;
});

let swipe_directions:any = {
    x:[],
    y:[]
};
let swipe_timeout;

HomeBrowser.Broadcaster.on('main swipe',(data)=>{
    HomeBrowser.FLAGS.swiping = (data.start === 1);
    if (data.start === 1){
        swipe_directions = {
            x:[],
            y:[]
        };
    }
});

document.addEventListener('mousewheel',(e)=>{
    if (HomeBrowser.FLAGS.swiping === true){
        clearTimeout(swipe_timeout);
        swipe_directions.x.push(e.deltaX);
        swipe_directions.y.push(e.deltaY);
        swipe_timeout = setTimeout(()=>{
            swipe_directions.x = (swipe_directions.x.reduce((i,a)=>i+a) / swipe_directions.x.length);
            swipe_directions.y = (swipe_directions.y.reduce((i,a)=>i+a) / swipe_directions.y.length);
            let direction = "";
            if (swipe_directions.x < 0) direction = "right";
            if (swipe_directions.x > 0) direction = "left";
            if ( Math.abs(swipe_directions.x) > 20 ) HomeBrowser.Broadcaster.broadcast('user swipe',direction);
        },400);
    }
});

HomeBrowser.Broadcaster.on('main command',(cmd)=>{
    switch (cmd){
        case "browser-backward":
            HomeBrowser.Broadcaster.broadcast('nav','back');
            break;
        case "browser-forward":
            HomeBrowser.Broadcaster.broadcast('nav','forward');
            break;
        case "browser-refresh":
            HomeBrowser.Broadcaster.broadcast('nav','reload');
            break;
    }
});

HomeBrowser.Broadcaster.on('main requests',(data)=>{

    if (data === 'close'){
        HomeBrowser.Broadcaster.broadcast('kill');
        HomeBrowser.Support.WriteToFile();
        HomeBrowser.Broadcaster.broadcast('get nav url',(url)=>{
            HomeBrowser.IO.Config.set('{}', 'lastSessionURL' , url );
        });
        HomeBrowser.IO.Config.writeCoreConfig( HomeBrowser.IO.HomeBrowserPaths.file_paths.HomeBrowserUserSettings , JSON.stringify(HomeBrowser.Preferences , null ,'\t'));
        require('electron').remote.getGlobal('killWindow')(); // actually dispose of window
    }
    else{
        alert(data);
    }

});

HomeBrowser.Broadcaster.on('main update',(data)=>{
    if (data === 'resize'){
        let r = require('electron').remote;
        let os = (HomeBrowser.FLAGS.show_download === true ? document.querySelector('.panel.download').clientHeight : 0);
        let newHeight = document.querySelector('.tabContainer').clientHeight - ( os );
        document.querySelectorAll('webview').forEach( (value:HTMLElement) => value.style.height = newHeight +'px');
        r.getGlobal('resizeWC')(-1, newHeight );
    }
});

HomeBrowser.Broadcaster.on('auto save',()=>{
    HomeBrowser.Broadcaster.broadcast('save user preferences','auto_save');
    HomeBrowser.Support.WriteToFile();
});

HomeBrowser.Broadcaster.on('save user preferences',()=>{
    HomeBrowser.IO.Config.writeCoreConfig( HomeBrowser.IO.HomeBrowserPaths.file_paths.HomeBrowserUserSettings , JSON.stringify(HomeBrowser.Preferences , null ,'\t'));
});

HomeBrowser.Support.WriteToFile(); //write log to file

HomeBrowser.show();

let TabM = new TabManager( document.querySelector('title-bar') );

let Mousetrap = require('mousetrap');
require('mousetrap-global-bind');

Mousetrap.bindGlobal('meta',()=>HomeBrowser.Key.activateKey.apply(HomeBrowser.Key,['meta']),'keydown');
Mousetrap.bindGlobal('meta',()=>HomeBrowser.Key.deactivateKey.apply(HomeBrowser.Key,['meta']),'keyup');
Mousetrap.bind('meta+alt+i',()=>{
    require('electron').remote.getGlobal('openDevTools')();
});

if ( HomeBrowser.Settings.general.showLastSession === false ){
    TabM.newTab();
}
else if ( HomeBrowser.IO.Config.has('{}','lastSessionURL') === true ){
    TabM.newTab( HomeBrowser.IO.Config.get('{}','lastSessionURL') );
}

HomeBrowser.Broadcaster.on('user swipe',(direction)=>{
    if (direction === "right"){
        HomeBrowser.Broadcaster.broadcast('nav','back');
    }
    else{
        HomeBrowser.Broadcaster.broadcast('nav','forward');
    }
});

HomeBrowser.Broadcaster.on('empty suggestion',()=>{
    document.querySelector('.panel.suggest ul').innerHTML = "";
});

HomeBrowser.Broadcaster.on('populate suggestions',(term)=>{

    fetch('https://suggestqueries.google.com/complete/search?client=chrome&q='+encodeURI(term)).then(value => {
        return value.json();
    }).then(obj => {
        HomeBrowser.Broadcaster.broadcast('empty suggestion');
        obj[1].forEach((t,i)=>{
            let it = document.createElement('li');
            it.innerHTML = `<span class="term">${t}</span><div class="badge">${ (obj[4]['google:suggesttype'][i] === "QUERY" ? HomeBrowser.Settings.search.searchEngine.split('|')[0] : 'Goto') }</div>`;
            document.querySelector('.panel.suggest ul').appendChild(it);
            it.addEventListener('click',()=>{
                HomeBrowser.Broadcaster.broadcast('nav goto',it.querySelector('.term').innerHTML);
                HomeBrowser.Broadcaster.broadcast('tab info','update');
            });
        });
    });

});


document.querySelector('.search input').addEventListener('focus',()=>{
    let inputbox = (<HTMLTextAreaElement>document.querySelector('input[type="text"]'));
    inputbox.select();
    //(<HTMLTextAreaElement>document.querySelector('.panel.suggest')).style.visibility = 'visible';
});

document.querySelector('.search input').addEventListener('blur',()=>{
    setTimeout(()=>{
        HomeBrowser.Broadcaster.broadcast('empty suggestion');
        //(<HTMLTextAreaElement>document.querySelector('.panel.suggest')).style.visibility = 'hidden';
    },250);
});

(()=>{
    let remote = require('electron').remote;
    remote.getCurrentWindow().maximize();
    HomeBrowser.Broadcaster.broadcast('empty suggestion');
    //(<HTMLTextAreaElement>document.querySelector('.panel.suggest')).style.visibility = 'hidden';
})();


HomeBrowser.Broadcaster.on('capture ready',(param:{tab_data:TabData,preview:string})=>{
    let t:HTMLImageElement = document.querySelector(`side-bar>tab[data-tab-id="${param.tab_data.id}"] [data-is="thumb"]`);

    t.src = 'file://' + param.preview + "?sig=" + HomeBrowser.Security.generateUUID("xxxy");

    let bounds = document.querySelector('webview').getBoundingClientRect();
    let ratio = bounds.width / 170;
    let newHeight = bounds.height / ratio;

    document.querySelectorAll('.vert > span:nth-of-type(2)').forEach((e:HTMLSpanElement)=>{
        e.style.height = newHeight + "px";
    });
});

require('electron').remote.session.fromPartition('persist:web').protocol.registerFileProtocol('home',((request:RegisterFileProtocolRequest, callback:(filePath)=>void) => {
    let path = require('path');
    if ( request.url === "home://landing/" ){
        let p  = path.normalize( path.join(__dirname,'assets','landing.html') );
        console.log( request,'path',p );
        callback({path: p})
    }
    else if ( request.url === ( 'home://new_tab/' ) ){
        let p  = path.normalize( path.join(__dirname,'assets','new_tab.html') );
        callback({path: p});
        // HomeBrowser.Broadcaster.broadcast('main redirect','https://encrypted.google.com/');
    }
    else if (request.url.startsWith('home://landing/') || request.url.startsWith('home://new_tab/')){
        let p  = path.join(__dirname,'assets',request.url.substr( 15 ));
        console.log( request,'path',p );
        callback( p )
    }
}),error=>{
    console.error(error);
});