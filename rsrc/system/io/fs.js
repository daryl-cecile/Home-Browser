var HomeBrowser;
(function (HomeBrowser) {
    let IO;
    (function (IO) {
        IO.HomeBrowserPaths = {
            directory_paths: {
                HomeBrowserDirectory: "",
                HomeBrowserSession: "",
                HomeBrowserCache: "",
                HomeBrowserSettings: "",
                HomeBrowserDebug: "",
                HomeBrowserDownloads: ""
            },
            file_paths: {
                HomeBrowserDefaultSettings: "",
                HomeBrowserUserSettings: "",
                HomeBrowserConfiguration: ""
            }
        };
        class FS {
            constructor() { }
            static readFile(filePath) {
                return FS.NFS.readFileSync(filePath, 'utf-8');
            }
            static writeFile(filePath, content) {
                try {
                    FS.NFS.writeFileSync(filePath, content, 'utf-8');
                    return true;
                }
                catch (ex) {
                    HomeBrowser.Support.log(ex.code, ex.message, ex.stack, HomeBrowser.Support.LogLevel.Erro);
                    return false;
                }
            }
        }
        FS.NFS = require('fs');
        IO.FS = FS;
        function init() {
            let fs = FS.NFS;
            let path = require('path');
            let os = require('os');
            let directory_paths = {};
            let file_paths = {};
            let firstRun = false;
            directory_paths.HomeBrowserDirectory = path.join(os.homedir(), 'HomeBrowser');
            directory_paths.HomeBrowserSession = path.join(directory_paths.HomeBrowserDirectory, 'Session');
            directory_paths.HomeBrowserCache = path.join(directory_paths.HomeBrowserSession, 'Cache');
            directory_paths.HomeBrowserSettings = path.join(directory_paths.HomeBrowserDirectory, 'Settings');
            directory_paths.HomeBrowserDebug = path.join(directory_paths.HomeBrowserDirectory, 'DebugOutput');
            directory_paths.HomeBrowserDownloads = path.join(os.homedir(), 'Downloads');
            file_paths.HomeBrowserDefaultSettings = path.join(directory_paths.HomeBrowserSettings, 'default.json');
            file_paths.HomeBrowserUserSettings = path.join(directory_paths.HomeBrowserSettings, 'preferences.json');
            file_paths.HomeBrowserConfiguration = path.join(directory_paths.HomeBrowserSettings, 'configuration.json');
            Object.keys(directory_paths).forEach(dir_name => {
                if (!fs.existsSync(directory_paths[dir_name])) {
                    fs.mkdirSync(directory_paths[dir_name]);
                    firstRun = true;
                    HomeBrowser.Support.log('SETUP_ITEM_NOT_FOUND', `The item ${dir_name} was not found, and so was created`, 'FS.init', 0);
                }
            });
            Object.keys(file_paths).forEach(f_name => {
                if (!fs.existsSync(file_paths[f_name])) {
                    let content = '{}';
                    if (f_name === 'HomeBrowserUserSettings')
                        content = '{"general":{},"search":{},"security":{}}';
                    if (f_name === 'HomeBrowserConfiguration')
                        content = '{"permission":{}}';
                    fs.writeFileSync(file_paths[f_name], content, 'utf-8');
                    firstRun = true;
                    HomeBrowser.Support.log('SETUP_ITEM_NOT_FOUND', `The item ${f_name} was not found, and so was created`, 'FS.init', 0);
                }
            });
            IO.HomeBrowserPaths = {
                directory_paths,
                file_paths
            };
            if (firstRun !== false || !fs.existsSync(path.join(HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserSettings, 'theme.css'))) {
                let s = fs.readFileSync(path.join(__dirname, 'push', 'theme.css'), 'utf-8');
                fs.writeFileSync(path.join(HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserSettings, 'theme.css'), s, 'utf-8');
            }
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'file://' + path.join(HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserSettings, 'theme.css');
            document.head.appendChild(link);
            return firstRun;
        }
        IO.init = init;
    })(IO = HomeBrowser.IO || (HomeBrowser.IO = {}));
})(HomeBrowser || (HomeBrowser = {}));
//# sourceMappingURL=fs.js.map