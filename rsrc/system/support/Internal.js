var HomeBrowser;
(function (HomeBrowser) {
    let Memory;
    (function (Memory) {
        let mem = {};
        function set(key, value) {
            if (!mem[key])
                mem[key] = [];
            mem[key].push(value);
        }
        Memory.set = set;
        function get(key) {
            if (!mem[key])
                mem[key] = [];
            return mem[key];
        }
        Memory.get = get;
        function forget(key, value) {
            if (!mem[key])
                mem[key] = [];
            if (mem[key].indexOf(value) > -1) {
                mem[key].splice(mem[key].indexOf(value), 1);
            }
        }
        Memory.forget = forget;
        function dump() {
            return mem;
        }
        Memory.dump = dump;
    })(Memory = HomeBrowser.Memory || (HomeBrowser.Memory = {}));
    class UserAgent {
        constructor(browserName = "Chrome", version = "62.0.3202.62") {
            this.platform = "Macintosh";
            this.mozillaV = "5.0";
            this.cpuBrand = "Intel";
            this.device = "Mac";
            this.os = "OS X";
            this.osVersion = "10_13_4";
            this.webkitBuild = "537.36";
            this.browserName = "Chrome";
            this.browserVers = "62.0.3202.62";
            this.browserName = browserName;
            this.browserVers = version;
        }
        get string() {
            return `Mozilla/${this.mozillaV} (${this.platform}; ${this.cpuBrand} ${this.device} ${this.os} ${this.osVersion}) AppleWebKit/${this.webkitBuild} (KHTML, like Gecko) ${this.browserName}/${this.browserVers} Safari/537.36`;
        }
    }
    HomeBrowser.UserAgent = UserAgent;
    let DLManager;
    (function (DLManager) {
        DLManager.Downloads = [];
        class DL {
            constructor(fname, fpath) {
                this.fileName = '';
                this.filePath = '';
                this.isPaused = false;
                this.failed = false;
                this.completed = false;
                this.dlstatus = '';
                this.progress = 0;
                this.fileName = fname;
                this.filePath = fpath;
            }
            get Percentage() {
                return this.progress + '%';
            }
            get Status() {
                return this.dlstatus;
            }
            updateProgress(percentage, status) {
                this.progress = percentage;
                this.dlstatus = status;
            }
            complete(status) {
                if (status !== 'completed') {
                    this.failed = true;
                }
                else {
                    this.completed = true;
                    setTimeout(() => {
                        HomeBrowser.DLManager.Downloads.splice(DLManager.Downloads.indexOf(this), 1);
                    }, 1000);
                }
            }
        }
        DLManager.DL = DL;
        function register(dl) {
            HomeBrowser.DLManager.Downloads.push(dl);
        }
        DLManager.register = register;
    })(DLManager = HomeBrowser.DLManager || (HomeBrowser.DLManager = {}));
    let FLAGS;
    (function (FLAGS) {
        FLAGS.show_download = false;
        FLAGS.swiping = false;
    })(FLAGS = HomeBrowser.FLAGS || (HomeBrowser.FLAGS = {}));
    let URL;
    (function (URL) {
        function isURL(url) {
            let URL_regex = /(([a-z]{3,6}:\/\/)([^/. ]+)\.([a-zA-Z./]+)(\:[0-9]+)*|home:\/\/[a-zA-Z/]+)/g;
            return URL_regex.test(url);
        }
        URL.isURL = isURL;
        function blockifyURL(url) {
            let newURL = "";
            let u = require('url').parse(url);
            if ((u.protocol === "https:" || u.protocol === "home:") && HomeBrowser.Memory.get('badWebsite').indexOf(u.host) === -1) {
                newURL += `<span class="secure">${(u.protocol === "https:" ? "https" : "home")}</span>`;
            }
            else {
                newURL += `<span class="insecure">${u.protocol.substr(0, u.protocol.length - 1)}</span>`;
            }
            newURL += `<span class="text">://</span><span class="host">${u.host}</span>`;
            newURL += `<span class="text">${u.path}</span>`;
            console.log('block', newURL);
            return newURL;
        }
        URL.blockifyURL = blockifyURL;
    })(URL = HomeBrowser.URL || (HomeBrowser.URL = {}));
    let Security;
    (function (Security) {
        Security.currentSessionID = generateUUID();
        function generateUUID(pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
            return pattern.replace(/[xy]/g, function (c) {
                let r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        Security.generateUUID = generateUUID;
        function createSessionCache() {
            let fs = HomeBrowser.IO.FS.NFS;
            let path = require('path');
            fs.mkdirSync(path.join(HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserCache, Security.currentSessionID));
        }
        Security.createSessionCache = createSessionCache;
    })(Security = HomeBrowser.Security || (HomeBrowser.Security = {}));
    let Key;
    (function (Key) {
        Key.activeKeys = [];
        function activateKey(name) {
            if (Key.activeKeys.indexOf(name) === -1) {
                Key.activeKeys.push(name);
                return true;
            }
            else {
                return false;
            }
        }
        Key.activateKey = activateKey;
        function deactivateKey(name) {
            let i = Key.activeKeys.indexOf(name);
            if (i > -1) {
                Key.activeKeys.splice(i, 1);
                return true;
            }
            else {
                return false;
            }
        }
        Key.deactivateKey = deactivateKey;
        function isPressed(name) {
            return (Key.activeKeys.indexOf(name) > -1);
        }
        Key.isPressed = isPressed;
    })(Key = HomeBrowser.Key || (HomeBrowser.Key = {}));
    let Broadcaster;
    (function (Broadcaster) {
        let handlers = {};
        function on(broadcastName, handler, once = false) {
            broadcastName = broadcastName.toUpperCase().split(' ').join('_');
            if (!handlers[broadcastName])
                handlers[broadcastName] = [];
            handlers[broadcastName].push({
                handler: handler,
                triggered: false,
                once: once
            });
        }
        Broadcaster.on = on;
        function broadcast(broadcastName, value = "null") {
            broadcastName = broadcastName.toUpperCase().split(' ').join('_');
            let valueStringified;
            try {
                valueStringified = JSON.stringify(value);
            }
            catch (xx) {
                valueStringified = value.toString();
            }
            HomeBrowser.Support.log('BROADCAST', 'Broadcasting ' + broadcastName.toLowerCase() + ' with value ' + valueStringified, 'broadcast', 0);
            if (!handlers[broadcastName])
                return;
            handlers[broadcastName].forEach(e => {
                if ((e.once === true && e.triggered !== true) || (e.once === false)) {
                    e.handler.call(this, value);
                    e.triggered = true;
                }
            });
        }
        Broadcaster.broadcast = broadcast;
    })(Broadcaster = HomeBrowser.Broadcaster || (HomeBrowser.Broadcaster = {}));
    let Visual;
    (function (Visual) {
        function getMasterElement(elementSelector) {
            return document.querySelector(elementSelector);
        }
        Visual.getMasterElement = getMasterElement;
        function forEachMasterElement(elementSelector, forEachHandler) {
            (document.querySelectorAll(elementSelector)).forEach(forEachHandler);
        }
        Visual.forEachMasterElement = forEachMasterElement;
        function setMasterElementStyle(elementSelector, styleProperty, value) {
            try {
                HomeBrowser.Visual.forEachMasterElement(elementSelector, (e) => {
                    e.style[styleProperty] = value;
                });
            }
            catch (ex) { }
        }
        Visual.setMasterElementStyle = setMasterElementStyle;
        function restoreTheme(reCall = false) {
            HomeBrowser.Support.log('THEMING', 'Restoring theme', 'visual.restoreTheme');
            HomeBrowser.Visual.setMasterElementStyle('.searchbar button', 'color', HomeBrowser.Visual.getPropertyValue('--tab-foreground-color'));
            HomeBrowser.Visual.setMasterElementStyle('div.url-helper .host', 'color', HomeBrowser.Visual.getPropertyValue('--website-color-url'));
            HomeBrowser.Visual.setMasterElementStyle('title-bar', 'background', HomeBrowser.Visual.getPropertyValue('--titlebar-background-color'));
            HomeBrowser.Visual.setMasterElementStyle('div.url-helper .text', 'color', HomeBrowser.Visual.getPropertyValue('--website-path-color'));
            if (reCall === true) {
                setTimeout(() => HomeBrowser.Visual.restoreTheme(false), 2000);
            }
        }
        Visual.restoreTheme = restoreTheme;
        function getPropertyValue(cssPropertyName) {
            return window.getComputedStyle(document.body).getPropertyValue(cssPropertyName).trim();
        }
        Visual.getPropertyValue = getPropertyValue;
        function setTheme(themeColor) {
            HomeBrowser.Support.log('THEMING', 'Setting theme color' + themeColor, 'visual.setTheme');
            let Color = require('color');
            let c = Color(themeColor);
            let newFontColor = HomeBrowser.Visual.getPropertyValue('--website-url-color');
            if (c.isDark()) {
                newFontColor = Color(newFontColor).negate().rgb().string();
                HomeBrowser.Support.log('THEMING', 'Dark theme set', 'visual.setTheme');
                HomeBrowser.Visual.setMasterElementStyle('div.url-helper .text', 'color', HomeBrowser.Visual.getPropertyValue('--website-path-color-light'));
            }
            else {
                HomeBrowser.Support.log('THEMING', 'Light theme set', 'visual.setTheme');
                HomeBrowser.Visual.setMasterElementStyle('div.url-helper .text', 'color', HomeBrowser.Visual.getPropertyValue('--website-path-color'));
            }
            HomeBrowser.Visual.setMasterElementStyle('.searchbar button', 'color', newFontColor);
            HomeBrowser.Visual.setMasterElementStyle('div.url-helper .host', 'color', newFontColor);
            HomeBrowser.Visual.setMasterElementStyle('title-bar', 'background', themeColor);
        }
        Visual.setTheme = setTheme;
    })(Visual = HomeBrowser.Visual || (HomeBrowser.Visual = {}));
    function getFaviconPath(data) {
        let link = require('url').parse(data.tabWebElement.View.getURL());
        //
        //
        // if (1){
        //
        // }
        // else{
        // return "http://www.google.com/s2/favicons?domain="+link.host
        return "https://api.statvoo.com/favicon/?url=" + link.host;
        // }
    }
    HomeBrowser.getFaviconPath = getFaviconPath;
})(HomeBrowser || (HomeBrowser = {}));
require('electron').ipcRenderer.on('HOME_BROADCAST', (e, message, data) => {
    HomeBrowser.Broadcaster.broadcast(message, data);
});
//# sourceMappingURL=Internal.js.map