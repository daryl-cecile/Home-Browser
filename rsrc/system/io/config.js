var HomeBrowser;
(function (HomeBrowser) {
    let IO;
    (function (IO) {
        class Config extends HomeBrowser.IO.FS {
            static readCoreConfig(HomeBrowserFile) {
                return Config.NFS.readFileSync(HomeBrowserFile, 'utf-8');
            }
            static readConfig(HomeBrowserDirectory, fileName) {
                let path = require('path');
                return Config.NFS.readFileSync(path.join(HomeBrowserDirectory, fileName), 'utf-8');
            }
            static writeConfig(HomeBrowserDirectory, fileName, content) {
                let path = require('path');
                try {
                    Config.NFS.writeFileSync(path.join(HomeBrowserDirectory, fileName), content, 'utf-8');
                    return true;
                }
                catch (ex) {
                    HomeBrowser.Support.log(ex.code, ex.message, ex.stack, HomeBrowser.Support.LogLevel.Erro);
                    return false;
                }
            }
            static writeCoreConfig(HomeBrowserFile, content) {
                try {
                    Config.NFS.writeFileSync(HomeBrowserFile, content, 'utf-8');
                    return true;
                }
                catch (ex) {
                    HomeBrowser.Support.log(ex.code, ex.message, ex.stack, HomeBrowser.Support.LogLevel.Erro);
                    return false;
                }
            }
            static has(p, key) {
                let c = JSON.parse(Config.NFS.readFileSync(IO.HomeBrowserPaths.file_paths.HomeBrowserConfiguration, 'utf-8'));
                if (p === "{}") {
                    return c.hasOwnProperty(key);
                }
                else {
                    return c[p].hasOwnProperty(key);
                }
            }
            static get(p, key) {
                let c = JSON.parse(Config.NFS.readFileSync(IO.HomeBrowserPaths.file_paths.HomeBrowserConfiguration, 'utf-8'));
                if (p === "{}") {
                    return c[key];
                }
                else {
                    return c[p][key];
                }
            }
            static set(p, key, value) {
                let c = JSON.parse(Config.NFS.readFileSync(IO.HomeBrowserPaths.file_paths.HomeBrowserConfiguration, 'utf-8'));
                if (p === "{}") {
                    c[key] = value;
                }
                else {
                    c[p][key] = value;
                }
                Config.NFS.writeFileSync(IO.HomeBrowserPaths.file_paths.HomeBrowserConfiguration, JSON.stringify(c, null, '\t'), 'utf-8');
            }
        }
        IO.Config = Config;
    })(IO = HomeBrowser.IO || (HomeBrowser.IO = {}));
})(HomeBrowser || (HomeBrowser = {}));
//# sourceMappingURL=config.js.map