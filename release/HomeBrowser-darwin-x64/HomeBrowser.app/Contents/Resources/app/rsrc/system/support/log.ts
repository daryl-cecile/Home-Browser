

namespace HomeBrowser{

    export namespace Support{

        let LogList:Array<Log> = [];

        export enum LogLevel{
            Info = 0, // just informing
            Warn = 1, // just warning
            Erro = 2, // error, skipping
            Fail = 3 // error, unable to continue
        }

        export class Log{
            public Error:string = '';
            public Message:string = '';
            public Location:string = '';
            public Ranking:LogLevel = 0;

            constructor(){}
        }

        export function getLogs():Array<Log>{
            return LogList;
        }

        export function log(err:string,content:string,loc:string,rank:LogLevel=0){
            let logItem = new Log();

            logItem.Error = err;
            logItem.Message = content;
            logItem.Location = loc;
            logItem.Ranking = rank;

            LogList.push(logItem);

            console.log('LOG : ',logItem);
        }

        export function WriteToFile(){

            let content = "";

            getLogs().forEach(l=>{
                content += '[' + LogLevel[l.Ranking] + '][' + l.Location + '] ' + l.Error + ': ' + l.Message + '\n';
            });

            HomeBrowser.IO.Config.writeConfig(HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserDebug,'lastRun.log',content);
        }


    }

}