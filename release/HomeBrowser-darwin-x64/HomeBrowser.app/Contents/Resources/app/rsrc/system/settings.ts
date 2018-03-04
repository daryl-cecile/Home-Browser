

namespace HomeBrowser{

    export interface ISettings{
        general:{
            showLastSession:boolean,
            showNewTab:boolean,
            newTabURL:"https://encrypted.google.com/"|string,
            downloadFolder: string
        },
        search:{
            searchEngine:"Google|https://www.google.co.uk/search?q=${query}&ie=utf-8&oe=utf-8&client=Home"|string
        },
        security:{
            javascriptEnabled: boolean,
            extensionsEnabled: boolean,
            onPermissionRequests: string
        }
    }

    export interface IPreferences{
        general?:{
            showLastSession?:boolean,
            showNewTab?:boolean,
            newTabURL?:"https://encrypted.google.com/",
            downloadFolder?: string
        },
        search?:{
            searchEngine?:"Google|https://www.google.co.uk/search?q=${query}&ie=utf-8&oe=utf-8&client=Home"|string
        },
        security?:{
            javascriptEnabled?: boolean,
            extensionsEnabled?: boolean,
            onPermissionRequests?: string
        }
    }

    export let Settings:ISettings;

    export let Preferences:IPreferences;

    export function show(){
        require('electron').remote.getGlobal('showWindow')();
    }

}