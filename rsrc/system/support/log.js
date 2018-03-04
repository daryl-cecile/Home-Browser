var HomeBrowser;
(function (HomeBrowser) {
    let Support;
    (function (Support) {
        let LogList = [];
        let LogLevel;
        (function (LogLevel) {
            LogLevel[LogLevel["Info"] = 0] = "Info";
            LogLevel[LogLevel["Warn"] = 1] = "Warn";
            LogLevel[LogLevel["Erro"] = 2] = "Erro";
            LogLevel[LogLevel["Fail"] = 3] = "Fail"; // error, unable to continue
        })(LogLevel = Support.LogLevel || (Support.LogLevel = {}));
        class Log {
            constructor() {
                this.Error = '';
                this.Message = '';
                this.Location = '';
                this.Ranking = 0;
            }
        }
        Support.Log = Log;
        function getLogs() {
            return LogList;
        }
        Support.getLogs = getLogs;
        function log(err, content, loc, rank = 0) {
            let logItem = new Log();
            logItem.Error = err;
            logItem.Message = content;
            logItem.Location = loc;
            logItem.Ranking = rank;
            LogList.push(logItem);
            console.log('LOG : ', logItem);
        }
        Support.log = log;
        function WriteToFile() {
            let content = "";
            getLogs().forEach(l => {
                content += '[' + LogLevel[l.Ranking] + '][' + l.Location + '] ' + l.Error + ': ' + l.Message + '\n';
            });
            HomeBrowser.IO.Config.writeConfig(HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserDebug, 'lastRun.log', content);
        }
        Support.WriteToFile = WriteToFile;
    })(Support = HomeBrowser.Support || (HomeBrowser.Support = {}));
})(HomeBrowser || (HomeBrowser = {}));
//# sourceMappingURL=log.js.map