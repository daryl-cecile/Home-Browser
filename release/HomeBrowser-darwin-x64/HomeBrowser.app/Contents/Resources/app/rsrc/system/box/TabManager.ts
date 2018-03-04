import ConsoleMessageEvent = Electron.ConsoleMessageEvent;

class TabData{
    public url : string = '';
    public tabTitle : string = '';
    public tabWebElement : WSB;
    public id : number = 0;
    public active : boolean = false;

    constructor(info:any){

        if ( info.type === 'internal' ){
            this.tabTitle = info.title;
            this.url = 'Home://'+info.url;
        }
        else{
            this.tabTitle = info.title;
            this.url = info.url;
        }

        this.tabWebElement = new WSB(this.url);

        HomeBrowser.Broadcaster.on('nav',(data)=>{
            if (this.active === true){
                if (data === "back"){
                    this.navigate.goBack();
                }
                else if (data === "forward"){
                    this.navigate.goForward();
                }
                else if (data === "refresh"){
                    this.navigate.refresh();
                }
                else if (data === "reload"){
                    this.navigate.reload();
                }
            }
        });

        HomeBrowser.Broadcaster.on('get nav url',(callback)=>{
            if (this.active === true){
                callback( this.tabWebElement.View.getURL() );
            }
        });

        HomeBrowser.Broadcaster.on('nav goto',(data)=>{
            if (this.active === true){
                this.goTo( data );
            }
        });

        HomeBrowser.Broadcaster.on('security',(data)=>{
            if (this.active === true){
                document.querySelector('.search button').innerHTML = data;
            }
        });

        HomeBrowser.Broadcaster.on('main redirect',(u)=>{
            if ( this.url.startsWith('home://') ){
                this.goTo(u);
            }
        });

        HomeBrowser.Broadcaster.on('url',(data)=>{
            if (this.active === true){
                (<HTMLTextAreaElement>document.querySelector('.search input')).value = data;
            }
        });

        HomeBrowser.Broadcaster.on('toggle',(data)=>{
            if (this.active === true){
                if (data === "download"){
                    //TODO toggle downloads
                }
            }
        });

        let backgroundSkips = 6;
        let activeSkips = 3;
        let skipCount = 0;

        setInterval(()=>{
            if (this.active === true && skipCount === activeSkips){
                skipCount = 0;
                HomeBrowser.Visual.capture(this);
            }
            else if (this.active === false && skipCount === backgroundSkips){
                skipCount = 0;
                HomeBrowser.Visual.capture(this);
            }
            else{
                skipCount ++;
            }
        },1000 * 10);
    }

    public static clone(oldData:TabData){
        let data = new TabData({
            type:'internal',
            url:oldData.url,
            title:oldData.tabTitle
        });
        data.id = oldData.id;
        return data;
    }

    public loadWeb(tabM:TabManager,callback?){
        setTimeout(()=>{
            this.tabWebElement.setup(tabM,this);
            this.tabWebElement.goTo(this.url);
            if (callback) callback();
        },500);
    }

    public goTo(url:string){
        // TODO: parse url or query from string

        // let URL_regex = /([a-z]{3,6}:\/\/)([^/. ]+)\.([a-zA-Z./]+)(\:[0-9]+)*/g;
        let PROTOCOL_regex = /^([a-z]+:\/\/)/gmi;

        // if ( URL_regex.test(url) === true ){
        if ( HomeBrowser.URL.isURL(url) === true ){
            this.tabWebElement.goTo(url);
            this.url = url
        }
        else{
            let hasProtocol = PROTOCOL_regex.test(url) ;
            if ( !hasProtocol && HomeBrowser.URL.isURL( 'https://' + url ) === true ){
                this.tabWebElement.goTo('https://' + url);
                this.url = 'https://' + url
            }
            else{
                this.tabWebElement.goTo( HomeBrowser.Settings.search.searchEngine.split('|')[1].split('${query}').join( encodeURI(url) ) )
            }
        }

    }

    public on(ev:string,handler,useCapture?:boolean){
        this.tabWebElement.View.addEventListener(ev,handler,useCapture);
    }

    public get navigate(){
        return {
            goBack: ()=>{
                this.tabWebElement.View.goBack();
                HomeBrowser.Support.log('NAV','goback','data.navigate');
            },
            goForward: ()=>{
                this.tabWebElement.View.goForward();
                HomeBrowser.Support.log('NAV','goforward','data.navigate');
            },
            refresh: ()=>{
                this.tabWebElement.View.reloadIgnoringCache();
                HomeBrowser.Support.log('NAV','reload no cache','data.navigate');
            },
            reload: ()=>{
                this.tabWebElement.View.reload();
                HomeBrowser.Support.log('NAV','reload from cache','data.navigate');
            }
        }
    }
}

class TabManager{
    private _tabIncrement:number = 0;
    private _tabHeaderContainer: Element;

    private tabCollection = [];

    public static closedTabs:{
        [name:string]:TabData
    } = {};

    public static dataStore:{
        [name:string]:TabData
    } = {};

    constructor(element:Element){

        this._tabHeaderContainer = element;

        HomeBrowser.Broadcaster.on('create new tab',(d)=>{
            if (d !== "null"){
                this.newTab(d);
            }else{
                this.newTab();
            }
        })

    }

    static closeTab(id:number){
        let data:TabData = TabManager.dataStore[id];
        data.tabWebElement.View.parentNode.removeChild( data.tabWebElement.View );
        TabManager.closedTabs[data.id] = data;
        let closingTabParts = document.querySelectorAll('[data-tab-id="'+id+'"]');
        if ( closingTabParts.length > 0 ){
            closingTabParts.forEach(c=>{
                c.parentNode.removeChild(c);
            });
        }
        data.active = false;
        delete TabManager.dataStore[id];

        //get any tab to focus
        setTimeout(()=>{
            let nextTabId = parseInt(document.querySelector('tab').getAttribute('data-tab-id'));
            TabManager.openTab(nextTabId);
        },250);
        HomeBrowser.Broadcaster.broadcast('tab info','update');
    }

    public restoreTab(id:number){
        let tabData = TabData.clone( TabManager.closedTabs[ id ] );
        this.addTab(tabData);
        delete TabManager.closedTabs[id];
        HomeBrowser.Broadcaster.broadcast('tab info','update');
    }

    static openTab(id:number){

        let tabContents = document.querySelectorAll('.tabContainer>div:not([data-tab-id="'+id+'"])');
        let tabHeaders = document.querySelectorAll('side-bar tab:not([data-tab-id="'+id+'"])');

        let currentTabParts = document.querySelectorAll('[data-tab-id="'+id+'"]');

        if ( currentTabParts.length > 0 ){
            currentTabParts.forEach(c=>{
                c.classList.add('active');
            });
        }

        if ( tabContents.length !== 0 ){
            tabContents.forEach(tc=>{
                tc.classList.remove('active');

                let data:TabData = TabManager.dataStore[ parseInt(tc.getAttribute('data-tab-id')) ];
                data.active = false;

            });
        }

        if ( tabHeaders.length !== 0 ){
            tabHeaders.forEach(th=>{
                th.classList.remove('active');
            });
        }

        let data:TabData = TabManager.dataStore[ id ];
        data.active = true;

        HomeBrowser.Broadcaster.broadcast('main update','resize');
        HomeBrowser.Broadcaster.broadcast('tab selected',id);
        HomeBrowser.Broadcaster.broadcast('tab info','update');
    }

    private getTabs(id:number){
        return this.tabCollection.filter(tc=>{
            return tc.tabData.id === id;
        });
    }

    updateTab(id:number,section:string,value?:any){
        let tab = this.getTabs(id)[0];

        let tData = TabManager.dataStore[id];

        if (section === 'indicator'){
            if (value === 'LOADING'){
                tab.tabElement.querySelector('.i').innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>'
                document.querySelector('[data-do="refresh"]').innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
            }
            else if (value === 'READY'){
                tab.tabElement.querySelector('.i').innerHTML = '<i class="fas fa-file"></i>';
                document.querySelector('[data-do="refresh"]').innerHTML = '<i class="fas fa-undo"></i>';
            }
        }
        else if (section === 'title'){
            tab.tabElement.querySelector('span[data-is="title"]').innerHTML = value;
        }
        else if (section === 'favicon'){
            let favPath = HomeBrowser.getFaviconPath(tData);
            if (value) favPath === value;
            tab.tabElement.querySelector('span.i').innerHTML = `<img class="icon" src='${ favPath }'/>`;
        }
        else if (section === 'security'){
            if (value === true){
                HomeBrowser.Broadcaster.broadcast('security','<i style="color:green" class="fas fa-lock"></i>');
                // document.querySelector('.tabContainer [data-tab-id="'+id+'"] .search button').innerHTML = '<i style="color:green" class="fas fa-lock"></i>';
            }
            else{
                HomeBrowser.Broadcaster.broadcast('security','<i style="color:dimgray" class="fas fa-unlock"></i>');
                // document.querySelector('.tabContainer [data-tab-id="'+id+'"] .search button').innerHTML = '<i style="color:dimgray" class="fas fa-unlock"></i>';
            }
        }
        else if (section === 'url'){
            HomeBrowser.Broadcaster.broadcast('url',value);
            // (<HTMLTextAreaElement>document.querySelector('.tabContainer [data-tab-id="'+id+'"] .search input')).value = value;
        }

        document.querySelector('[data-do="back"]').className = ( ( tData.tabWebElement.View.canGoBack() ? 'enabled' : 'disabled') );
        document.querySelector('[data-do="forward"]').className = ( ( tData.tabWebElement.View.canGoForward() ? 'enabled' : 'disabled') );

        console.log(tData.tabWebElement.View.canGoBack(),tData.tabWebElement.View.canGoForward());
    }

    newTab(url:string='about:blank',autoOpen:boolean=true){
        let newTabURL = url;
        if (newTabURL === 'about:blank') newTabURL = HomeBrowser.Settings.general.newTabURL;
        this.addTab( new TabData({
            type:'web',
            title:'New Tab',
            url:newTabURL
        }) , autoOpen);
        HomeBrowser.Support.log('TAB_MANAGER','Created new tab : ' + newTabURL,'tabmanager.newtab');
    }

    addTab(data:TabData,openWhenReady:boolean=true){

        this._tabIncrement++;
        data.id = this._tabIncrement;

        document.querySelector('.tabContainer').classList.remove('shrink-for-download');

        let tab = document.createElement('tab');
        tab.onclick = ()=>TabManager.openTab(data.id);
        tab.setAttribute('data-tab-id',data.id.toString());
        tab.innerHTML = `
            <div class="vert">
                <span>
                    <span class="i">
                        <i class="fas fa-circle-notch fa-spin"></i>
                    </span>
                    <span data-is="title">${data.tabTitle}</span>
                    <i onclick="TabManager.closeTab(${data.id})" class="fas fa-times"></i>
                </span>
                <span>
                    <img data-is="thumb" src="${HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserCache}/${HomeBrowser.Security.currentSessionID}/tab_${data.id}.png?12" alt="">
                </span>
            </div>`;
        document.querySelector('side-bar').appendChild( tab );

        let tabContent = document.createElement('div');
        tabContent.setAttribute('data-tab-id',data.id.toString());

        tabContent.appendChild( data.tabWebElement.View );

        document.querySelector('.tabContainer').appendChild( tabContent );

        this.tabCollection.push( {
            tabElement: tab,
            tabData: data
        } );

        TabManager.dataStore[data.id] = data;

        data.loadWeb(this,()=>{
            data.tabWebElement.View.setUserAgent((new HomeBrowser.UserAgent("Chrome","62.0.3202.62")).string);
            data.tabWebElement.View.getWebContents().on('certificate-error',(e,url:string,error:string,cert:Electron.Certificate,callback)=>{
                console.error(e,url,error,cert);

                callback(true);
            });
        }); //load webpage;

        data.on('did-start-loading',()=>{
            this.updateTab(data.id,'indicator','LOADING');
        });

        data.on('did-stop-loading',()=>{
            let thisURL = (require('url').parse(data.tabWebElement.View.getURL()));
            if ( HomeBrowser.Memory.get('badWebsite').indexOf( thisURL.hostname ) > -1 ){
                this.updateTab(data.id,'security', false );
            }
            else{
                this.updateTab(data.id,'security', true );
            }
            this.updateTab(data.id,'indicator','READY');
            this.updateTab(data.id,'favicon');
        });

        data.on('did-finish-load',()=>{
            HomeBrowser.Visual.capture(data);
            setTimeout(()=>HomeBrowser.Visual.capture(data),500);
        });

        data.on('did-navigate',()=>{
            HomeBrowser.Visual.capture(data);
            setTimeout(()=>HomeBrowser.Visual.capture(data),500);
        });

        data.on('console-message',(e:ConsoleMessageEvent)=>{
            switch (e.level){
                case -1:
                    HomeBrowser.Support.log('TAB DBG',e.message,e.sourceId + ':' + e.line,e.level);
                    console.debug('DBG',e.message,e.line);
                    break;
                case 0:
                    HomeBrowser.Support.log('TAB LOG',e.message,e.sourceId + ':' + e.line,e.level);
                    console.log('LOG',e.message,e.line);
                    break;
                case 1:
                    HomeBrowser.Support.log('TAB WARN',e.message,e.sourceId + ':' + e.line,e.level);
                    console.warn('WARN',e.message,e.line);
                    break;
                case 2:
                    HomeBrowser.Support.log('TAB ERROR',e.message,e.sourceId + ':' + e.line,e.level);
                    console.error('ERROR',e.message,e.line);
                    break;
                default:
                    HomeBrowser.Support.log('TAB INFO',e.message,e.sourceId + ':' + e.line,e.level);
                    console.info('INFO',e.message,e.line,e.level)
            }
        });

        data.on('page-title-updated',(e)=>{
            this.updateTab(data.id,'title',e.title);
        });

        data.on('will-navigate',()=>{
            HomeBrowser.Visual.restoreTheme();
        });

        data.on('new-window',(e)=>{
            this.newTab(e.url,e.disposition !== "background-tab");
        });

        data.on('page-favicon-updated',e=>{
            this.updateTab(data.id,'favicon',e.favicons[0]);
        });

        data.on('did-navigate',(e)=>{
            this.updateTab(data.id,'url',e.url);
            let thisURL = (require('url').parse(data.tabWebElement.View.getURL()));
            if ( HomeBrowser.Memory.get('badWebsite').indexOf( thisURL.hostname ) > -1 ){
                this.updateTab(data.id,'security', false );
            }
            else{
                this.updateTab(data.id,'security', true );
            }
            HomeBrowser.Visual.restoreTheme();
        });

        data.on('did-change-theme-color',(e)=>{
            HomeBrowser.Visual.setTheme(e.themeColor)
        });

        data.on('update-target-url',(e)=>{
            document.querySelector('.panel.link').innerHTML = e.url;
        });

        HomeBrowser.Broadcaster.broadcast('new tab');

        if (openWhenReady === true) TabManager.openTab(data.id); // select new tab;

    }
}
//https://gordonlesti.com/change-theme-color-via-javascript/