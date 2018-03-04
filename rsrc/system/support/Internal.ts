
namespace HomeBrowser{

    export namespace Housekeeping{



    }

    export namespace Memory{

        let mem = {};

        export function set(key,value){
            if ( ! mem[key] ) mem[key] = [];
            mem[key].push(value);
        }

        export function get(key){
            if ( ! mem[key] ) mem[key] = [];
            return mem[key]
        }

        export function forget(key,value){
            if ( ! mem[key] ) mem[key] = [];
            if ( mem[key].indexOf(value) > -1 ){
                mem[key].splice( mem[key].indexOf(value) , 1 );
            }
        }

        export function dump(){
            return mem;
        }

    }

    export class UserAgent{
        private platform:string = "Macintosh";
        private mozillaV:string = "5.0";
        private cpuBrand:string = "Intel";
        private device:string   = "Mac";
        private os:string       = "OS X";
        private osVersion:string= "10_13_4";
        private webkitBuild:string="537.36";
        private browserName:string = "Chrome";
        private browserVers:string = "62.0.3202.62";
        constructor(browserName:string="Chrome",version:string="62.0.3202.62"){
            this.browserName = browserName;
            this.browserVers = version;
        }

        get string(){
            return `Mozilla/${this.mozillaV} (${this.platform}; ${this.cpuBrand} ${this.device} ${this.os} ${this.osVersion}) AppleWebKit/${this.webkitBuild} (KHTML, like Gecko) ${this.browserName}/${this.browserVers} Safari/537.36`;
        }
    }

    export namespace DLManager{

        export const Downloads = [];

        export class DL{
            public fileName:string = '';
            public filePath:string = '';
            public isPaused:boolean = false;

            public failed:boolean = false;

            public completed:boolean = false;

            private dlstatus:string = '';
            private progress:number = 0;

            constructor(fname:string,fpath:string){
                this.fileName = fname;
                this.filePath = fpath;
            }

            get Percentage():string{
                return this.progress + '%';
            }

            get Status():string{
                return this.dlstatus;
            }

            updateProgress(percentage:number,status:string){
                this.progress = percentage;
                this.dlstatus = status;
            }

            complete(status:string){
                if ( status !== 'completed' ){
                    this.failed = true;
                }
                else{
                    this.completed = true;

                    setTimeout(()=>{
                        HomeBrowser.DLManager.Downloads.splice( Downloads.indexOf(this) , 1 );
                    },1000);

                }
            }

        }

        export function register(dl:DL){
            HomeBrowser.DLManager.Downloads.push(dl);
        }

    }

    export namespace FLAGS{
        export let show_download:boolean = false;
        export let swiping:boolean = false;
    }

    export namespace URL{

        export function isURL(url){

            let URL_regex = /(([a-z]{3,6}:\/\/)([^/. ]+)\.([a-zA-Z./]+)(\:[0-9]+)*|home:\/\/[a-zA-Z/]+)/g;

            return URL_regex.test(url)

        }

        export function blockifyURL(url){

            let newURL = "";
            let u = require('url').parse(url);

            if ( (u.protocol === "https:" || u.protocol === "home:") && HomeBrowser.Memory.get('badWebsite').indexOf(u.host) === -1 ){
                newURL += `<span class="secure">${ (u.protocol === "https:" ? "https" : "home") }</span>`;
            }
            else{
                newURL += `<span class="insecure">${u.protocol.substr(0,u.protocol.length-1)}</span>`;
            }
            newURL += `<span class="text">://</span><span class="host">${ u.host }</span>`;
            newURL += `<span class="text">${u.path}</span>`;

            console.log('block',newURL);

            return newURL;
        }

    }

    export namespace Security{

        export const currentSessionID = generateUUID();

        export function generateUUID(pattern:string="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
            return pattern.replace(/[xy]/g, function(c) {
                let r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        export function createSessionCache(){

            let fs = HomeBrowser.IO.FS.NFS;
            let path = require('path');

            fs.mkdirSync( path.join( HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserCache , currentSessionID ) );

        }

    }

    export namespace Key{

        export let activeKeys = [];

        export function activateKey(name:string){
            if (activeKeys.indexOf(name) === -1) {
                activeKeys.push(name);
                return true
            }
            else{
                return false;
            }
        }

        export function deactivateKey(name:string){
            let i = activeKeys.indexOf(name);
            if (i > -1) {
                activeKeys.splice(i,1);
                return true;
            }
            else{
                return false;
            }
        }

        export function isPressed(name:string):boolean{
            return ( activeKeys.indexOf(name) > -1 );
        }

    }

    export namespace Broadcaster{

        let handlers:any = {};

        export function on(broadcastName:string,handler:any,once:boolean=false){
            broadcastName = broadcastName.toUpperCase().split(' ').join('_');
            if ( !handlers[broadcastName] ) handlers[broadcastName] = [];
            handlers[broadcastName].push({
                handler:handler,
                triggered:false,
                once:once
            });
        }

        export function broadcast(broadcastName:string,value:any="null"){
            broadcastName = broadcastName.toUpperCase().split(' ').join('_');

            let valueStringified;
            try{
                valueStringified = JSON.stringify(value);
            }
            catch(xx){
                valueStringified = value.toString();
            }

            Support.log('BROADCAST','Broadcasting ' + broadcastName.toLowerCase() + ' with value ' + valueStringified, 'broadcast', 0);
            if ( !handlers[broadcastName] ) return;
            handlers[broadcastName].forEach(e=>{
                if ( (e.once === true && e.triggered !== true) || (e.once === false) ){
                    e.handler.call(this,value);
                    e.triggered = true;
                }
            });
        }

    }

    export namespace Visual{

        export function getMasterElement(elementSelector:string):HTMLElement{
            return (<HTMLElement>document.querySelector(elementSelector));
        }

        export function forEachMasterElement(elementSelector:string,forEachHandler){
            (document.querySelectorAll(elementSelector)).forEach(forEachHandler);
        }

        export function setMasterElementStyle(elementSelector:string,styleProperty:string,value:string){
            try{
                HomeBrowser.Visual.forEachMasterElement(elementSelector,(e:HTMLElement)=>{
                    e.style[styleProperty] = value;
                })
            }
            catch(ex){}
        }

        export function restoreTheme(reCall:boolean=false){
            HomeBrowser.Support.log('THEMING','Restoring theme','visual.restoreTheme');
            HomeBrowser.Visual.setMasterElementStyle('.searchbar button','color', HomeBrowser.Visual.getPropertyValue('--tab-foreground-color'));
            HomeBrowser.Visual.setMasterElementStyle('div.url-helper .host','color', HomeBrowser.Visual.getPropertyValue('--website-color-url'));
            HomeBrowser.Visual.setMasterElementStyle('title-bar','background',HomeBrowser.Visual.getPropertyValue('--titlebar-background-color'));
            HomeBrowser.Visual.setMasterElementStyle('div.url-helper .text','color',HomeBrowser.Visual.getPropertyValue('--website-path-color'));
            if (reCall === true){
                setTimeout( ()=>HomeBrowser.Visual.restoreTheme(false) , 2000 );
            }
        }

        export function getPropertyValue(cssPropertyName:string){
            return window.getComputedStyle(document.body).getPropertyValue(cssPropertyName).trim()
        }

        export function setTheme(themeColor:string){
            HomeBrowser.Support.log('THEMING','Setting theme color'+themeColor,'visual.setTheme');
            let Color = require('color');
            let c = Color(themeColor);

            let newFontColor = HomeBrowser.Visual.getPropertyValue('--website-url-color');

            if (c.isDark()){
                newFontColor = Color(newFontColor).negate().rgb().string();
                HomeBrowser.Support.log('THEMING','Dark theme set','visual.setTheme');
                HomeBrowser.Visual.setMasterElementStyle('div.url-helper .text','color',HomeBrowser.Visual.getPropertyValue('--website-path-color-light'));
            }
            else{
                HomeBrowser.Support.log('THEMING','Light theme set','visual.setTheme');
                HomeBrowser.Visual.setMasterElementStyle('div.url-helper .text','color',HomeBrowser.Visual.getPropertyValue('--website-path-color'));
            }

            HomeBrowser.Visual.setMasterElementStyle('.searchbar button','color',newFontColor);
            HomeBrowser.Visual.setMasterElementStyle('div.url-helper .host','color',newFontColor);
            HomeBrowser.Visual.setMasterElementStyle('title-bar','background', themeColor);
        }

    }

    export function getFaviconPath(data:TabData){

        let link = require('url').parse( data.tabWebElement.View.getURL() );
        //
        //
        // if (1){
        //
        // }
        // else{
        // return "http://www.google.com/s2/favicons?domain="+link.host
            return "https://api.statvoo.com/favicon/?url="+link.host
        // }

    }

}

require('electron').ipcRenderer.on('HOME_BROADCAST',(e,message,data)=>{
    HomeBrowser.Broadcaster.broadcast(message,data);
});