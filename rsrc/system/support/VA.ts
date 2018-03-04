
namespace HomeBrowser{

    export namespace VisualAdapter{

        export enum MenuObjectValues{
            SEPERATOR = "seperator",
            CLICKABLE = "click_item",
            HOVERITEM = "hover_item",
            NULL = ""
        }

        export class MenuObject{
            public type:MenuObjectValues;
            public label:string = MenuObjectValues.NULL;
            public hint:string = MenuObjectValues.NULL;
            public events:{
                [eventName:string]:Array<any>
            } = {
                'click':[]
            };
            public enabled:boolean = false;

            constructor(disabled:boolean,type:MenuObjectValues){
                this.enabled = !disabled;
                this.type = type;
            }

            on(eventName,handler){
                if ( !this.events[eventName] ) this.events[eventName] = [];
                this.events[eventName].push(handler);
            }
        }

        export class MenuItem extends MenuObject{

            constructor(label:string,onClickHandler:()=>void,options?:any){
                super(false,MenuObjectValues.CLICKABLE);
                this.label = label;
                if (options && options['hint']) this.hint = options['hints'];
                if (options && options['disabled']) this.enabled = !options.disabled;
                if (options && options['events']) {
                    Object.keys(options.events).forEach(eventName=>{
                        this.on(eventName,options.events[eventName]);
                    });
                }
                this.on('click',onClickHandler);
            }

        }

        export class MenuSeperator extends MenuObject{
            constructor(){
                super(true,MenuObjectValues.SEPERATOR);
            }
        }

        export class Menu{

            public items:Array<MenuObject> = [];
            public menuElement:HTMLUListElement = document.createElement('ul');
            public contextMenuElement:HTMLDivElement = document.createElement('div');

            constructor(){
                this.contextMenuElement.className = "context-menu";
            }

            append(item:MenuObject){
                this.items.push(item);
            }

            closePopup(){
                try{
                    document.body.removeChild( this.contextMenuElement );
                }
                catch(X){
                    console.error(X);
                }
            }

            popup(webContent,ev,opt:{x,y}){

                let closeFilter = document.createElement('div');
                closeFilter.className = 'filter no-touch';

                this.items.forEach(item=>{
                    let itemElement = document.createElement('li');
                    if ( item.type === MenuObjectValues.SEPERATOR ){
                        itemElement.innerHTML = `<label></label>`;
                    }
                    else{
                        itemElement.innerHTML = `<label>${item.label}<span class="hint">${item.hint}</span></label>`;
                    }
                    this.menuElement.appendChild(itemElement);
                    if ( item.enabled === false ) itemElement.setAttribute('disabled','');
                    Object.keys(item.events).forEach(eventName=>{
                        item.events[eventName].forEach(eventHandler=>{
                            itemElement.addEventListener(eventName,eventHandler);
                        });
                    });
                    // automatically close popup after click
                    itemElement.addEventListener('click',()=>{
                        setTimeout(()=>{
                            document.body.removeChild( closeFilter );
                            this.closePopup();
                        },250);
                    });
                });

                this.contextMenuElement.appendChild( this.menuElement );

                this.contextMenuElement.style.left = `${opt.x}px`;
                this.contextMenuElement.style.top = `${opt.y + 35}px`;


                closeFilter.addEventListener('click',()=>{
                    document.body.removeChild( closeFilter );
                    this.closePopup();
                });

                closeFilter.addEventListener('contextmenu',()=>{
                    document.body.removeChild( closeFilter );
                    this.closePopup();
                });

                document.body.appendChild(closeFilter);
                document.body.appendChild( this.contextMenuElement );

            }

        }

    }

}