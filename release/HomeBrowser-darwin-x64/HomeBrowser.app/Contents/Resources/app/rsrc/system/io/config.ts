
namespace HomeBrowser{

    export namespace IO{

        export class Config extends HomeBrowser.IO.FS{

            static readCoreConfig(HomeBrowserFile:IO.HomeBrowserPath|string):string{

                return Config.NFS.readFileSync(  HomeBrowserFile  , 'utf-8' );

            }

            static readConfig(HomeBrowserDirectory:IO.HomeBrowserPath|string,fileName:string):string{

                let path = require('path');
                return Config.NFS.readFileSync( path.join( HomeBrowserDirectory , fileName ) , 'utf-8' );

            }

            static writeConfig(HomeBrowserDirectory:IO.HomeBrowserPath|string,fileName:string,content:string):boolean{

                let path = require('path');

                try{
                    Config.NFS.writeFileSync( path.join( HomeBrowserDirectory , fileName ) , content , 'utf-8' );
                    return true;
                }
                catch(ex){
                    Support.log(ex.code,ex.message,ex.stack,Support.LogLevel.Erro);
                    return false;
                }

            }

            static writeCoreConfig(HomeBrowserFile:IO.HomeBrowserPath|string,content:string):boolean{

                try{
                    Config.NFS.writeFileSync( HomeBrowserFile , content , 'utf-8' );
                    return true;
                }
                catch(ex){
                    Support.log(ex.code,ex.message,ex.stack,Support.LogLevel.Erro);
                    return false;
                }

            }

            static has(p:string,key:string){
                let c = JSON.parse( Config.NFS.readFileSync( HomeBrowserPaths.file_paths.HomeBrowserConfiguration ,'utf-8' ) );
                if ( p === "{}" ){
                    return c.hasOwnProperty(key);
                }
                else{
                    return c[p].hasOwnProperty(key);
                }
            }

            static get(p:string,key:string){
                let c = JSON.parse( Config.NFS.readFileSync( HomeBrowserPaths.file_paths.HomeBrowserConfiguration ,'utf-8' ) );
                if ( p === "{}" ){
                    return c[key];
                }
                else{
                    return c[p][key];
                }
            }

            static set(p:string,key:string,value:any){
                let c = JSON.parse( Config.NFS.readFileSync( HomeBrowserPaths.file_paths.HomeBrowserConfiguration ,'utf-8' ) );
                if ( p === "{}" ){
                    c[key] = value;
                }
                else{
                    c[p][key] = value;
                }
                Config.NFS.writeFileSync( HomeBrowserPaths.file_paths.HomeBrowserConfiguration , JSON.stringify( c , null ,'\t' ) , 'utf-8' );
            }

        }

    }


}