var HomeBrowser;
(function (HomeBrowser) {
    let VisualAdapter;
    (function (VisualAdapter) {
        let MenuObjectValues;
        (function (MenuObjectValues) {
            MenuObjectValues["SEPERATOR"] = "seperator";
            MenuObjectValues["CLICKABLE"] = "click_item";
            MenuObjectValues["HOVERITEM"] = "hover_item";
            MenuObjectValues["NULL"] = "";
        })(MenuObjectValues = VisualAdapter.MenuObjectValues || (VisualAdapter.MenuObjectValues = {}));
        class MenuObject {
            constructor(disabled, type) {
                this.label = MenuObjectValues.NULL;
                this.hint = MenuObjectValues.NULL;
                this.events = {
                    'click': []
                };
                this.enabled = false;
                this.enabled = !disabled;
                this.type = type;
            }
            on(eventName, handler) {
                if (!this.events[eventName])
                    this.events[eventName] = [];
                this.events[eventName].push(handler);
            }
        }
        VisualAdapter.MenuObject = MenuObject;
        class MenuItem extends MenuObject {
            constructor(label, onClickHandler, options) {
                super(false, MenuObjectValues.CLICKABLE);
                this.label = label;
                if (options && options['hint'])
                    this.hint = options['hints'];
                if (options && options['disabled'])
                    this.enabled = !options.disabled;
                if (options && options['events']) {
                    Object.keys(options.events).forEach(eventName => {
                        this.on(eventName, options.events[eventName]);
                    });
                }
                this.on('click', onClickHandler);
            }
        }
        VisualAdapter.MenuItem = MenuItem;
        class MenuSeperator extends MenuObject {
            constructor() {
                super(true, MenuObjectValues.SEPERATOR);
            }
        }
        VisualAdapter.MenuSeperator = MenuSeperator;
        class Menu {
            constructor() {
                this.items = [];
                this.menuElement = document.createElement('ul');
                this.contextMenuElement = document.createElement('div');
                this.contextMenuElement.className = "context-menu";
            }
            append(item) {
                this.items.push(item);
            }
            closePopup() {
                try {
                    document.body.removeChild(this.contextMenuElement);
                }
                catch (X) {
                    console.error(X);
                }
            }
            popup(webContent, ev, opt) {
                let closeFilter = document.createElement('div');
                closeFilter.className = 'filter no-touch';
                this.items.forEach(item => {
                    let itemElement = document.createElement('li');
                    if (item.type === MenuObjectValues.SEPERATOR) {
                        itemElement.innerHTML = `<label></label>`;
                    }
                    else {
                        itemElement.innerHTML = `<label>${item.label}<span class="hint">${item.hint}</span></label>`;
                    }
                    this.menuElement.appendChild(itemElement);
                    if (item.enabled === false)
                        itemElement.setAttribute('disabled', '');
                    Object.keys(item.events).forEach(eventName => {
                        item.events[eventName].forEach(eventHandler => {
                            itemElement.addEventListener(eventName, eventHandler);
                        });
                    });
                    // automatically close popup after click
                    itemElement.addEventListener('click', () => {
                        setTimeout(() => {
                            document.body.removeChild(closeFilter);
                            this.closePopup();
                        }, 250);
                    });
                });
                this.contextMenuElement.appendChild(this.menuElement);
                this.contextMenuElement.style.left = `${opt.x}px`;
                this.contextMenuElement.style.top = `${opt.y + 35}px`;
                closeFilter.addEventListener('click', () => {
                    document.body.removeChild(closeFilter);
                    this.closePopup();
                });
                closeFilter.addEventListener('contextmenu', () => {
                    document.body.removeChild(closeFilter);
                    this.closePopup();
                });
                document.body.appendChild(closeFilter);
                document.body.appendChild(this.contextMenuElement);
            }
        }
        VisualAdapter.Menu = Menu;
    })(VisualAdapter = HomeBrowser.VisualAdapter || (HomeBrowser.VisualAdapter = {}));
})(HomeBrowser || (HomeBrowser = {}));
//# sourceMappingURL=VA.js.map