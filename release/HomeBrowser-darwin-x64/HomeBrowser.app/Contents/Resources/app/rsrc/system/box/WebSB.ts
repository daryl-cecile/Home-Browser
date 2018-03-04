/// <reference path="../../../node_modules/electron-prebuilt-compile/electron.d.ts"/>

declare class WebView implements Electron.WebviewTag{
    accessKey: string;
    children: HTMLCollection;
    contentEditable: string;
    dataset: DOMStringMap;
    dir: string;
    draggable: boolean;
    hidden: boolean;
    hideFocus: boolean;
    innerText: string;
    isContentEditable: boolean;
    lang: string;
    offsetHeight: number;
    offsetLeft: number;
    offsetParent: Element;
    offsetTop: number;
    offsetWidth: number;
    onabort: (ev: UIEvent) => any;
    onactivate: (ev: UIEvent) => any;
    onbeforeactivate: (ev: UIEvent) => any;
    onbeforecopy: (ev: ClipboardEvent) => any;
    onbeforecut: (ev: ClipboardEvent) => any;
    onbeforedeactivate: (ev: UIEvent) => any;
    onbeforepaste: (ev: ClipboardEvent) => any;
    onblur: (ev: FocusEvent) => any;
    oncanplay: (ev: Event) => any;
    oncanplaythrough: (ev: Event) => any;
    onchange: (ev: Event) => any;
    onclick: (ev: MouseEvent) => any;
    oncontextmenu: (ev: PointerEvent) => any;
    oncopy: (ev: ClipboardEvent) => any;
    oncuechange: (ev: Event) => any;
    oncut: (ev: ClipboardEvent) => any;
    ondblclick: (ev: MouseEvent) => any;
    ondeactivate: (ev: UIEvent) => any;
    ondrag: (ev: DragEvent) => any;
    ondragend: (ev: DragEvent) => any;
    ondragenter: (ev: DragEvent) => any;
    ondragleave: (ev: DragEvent) => any;
    ondragover: (ev: DragEvent) => any;
    ondragstart: (ev: DragEvent) => any;
    ondrop: (ev: DragEvent) => any;
    ondurationchange: (ev: Event) => any;
    onemptied: (ev: Event) => any;
    onended: (ev: MediaStreamErrorEvent) => any;
    onerror: (ev: ErrorEvent) => any;
    onfocus: (ev: FocusEvent) => any;
    oninput: (ev: Event) => any;
    oninvalid: (ev: Event) => any;
    onkeydown: (ev: KeyboardEvent) => any;
    onkeypress: (ev: KeyboardEvent) => any;
    onkeyup: (ev: KeyboardEvent) => any;
    onload: (ev: Event) => any;
    onloadeddata: (ev: Event) => any;
    onloadedmetadata: (ev: Event) => any;
    onloadstart: (ev: Event) => any;
    onmousedown: (ev: MouseEvent) => any;
    onmouseenter: (ev: MouseEvent) => any;
    onmouseleave: (ev: MouseEvent) => any;
    onmousemove: (ev: MouseEvent) => any;
    onmouseout: (ev: MouseEvent) => any;
    onmouseover: (ev: MouseEvent) => any;
    onmouseup: (ev: MouseEvent) => any;
    onmousewheel: (ev: WheelEvent) => any;
    onmscontentzoom: (ev: UIEvent) => any;
    onmsmanipulationstatechanged: (ev: MSManipulationEvent) => any;
    onpaste: (ev: ClipboardEvent) => any;
    onpause: (ev: Event) => any;
    onplay: (ev: Event) => any;
    onplaying: (ev: Event) => any;
    onprogress: (ev: ProgressEvent) => any;
    onratechange: (ev: Event) => any;
    onreset: (ev: Event) => any;
    onscroll: (ev: UIEvent) => any;
    onseeked: (ev: Event) => any;
    onseeking: (ev: Event) => any;
    onselect: (ev: UIEvent) => any;
    onselectstart: (ev: Event) => any;
    onstalled: (ev: Event) => any;
    onsubmit: (ev: Event) => any;
    onsuspend: (ev: Event) => any;
    ontimeupdate: (ev: Event) => any;
    onvolumechange: (ev: Event) => any;
    onwaiting: (ev: Event) => any;
    outerText: string;
    spellcheck: boolean;
    style: CSSStyleDeclaration;
    tabIndex: number;
    title: string;
    classList: DOMTokenList;
    className: string;
    clientHeight: number;
    clientLeft: number;
    clientTop: number;
    clientWidth: number;
    id: string;
    innerHTML: string;
    msContentZoomFactor: number;
    msRegionOverflow: string;
    onariarequest: (ev: Event) => any;
    oncommand: (ev: Event) => any;
    ongotpointercapture: (ev: PointerEvent) => any;
    onlostpointercapture: (ev: PointerEvent) => any;
    onmsgesturechange: (ev: MSGestureEvent) => any;
    onmsgesturedoubletap: (ev: MSGestureEvent) => any;
    onmsgestureend: (ev: MSGestureEvent) => any;
    onmsgesturehold: (ev: MSGestureEvent) => any;
    onmsgesturestart: (ev: MSGestureEvent) => any;
    onmsgesturetap: (ev: MSGestureEvent) => any;
    onmsgotpointercapture: (ev: MSPointerEvent) => any;
    onmsinertiastart: (ev: MSGestureEvent) => any;
    onmslostpointercapture: (ev: MSPointerEvent) => any;
    onmspointercancel: (ev: MSPointerEvent) => any;
    onmspointerdown: (ev: MSPointerEvent) => any;
    onmspointerenter: (ev: MSPointerEvent) => any;
    onmspointerleave: (ev: MSPointerEvent) => any;
    onmspointermove: (ev: MSPointerEvent) => any;
    onmspointerout: (ev: MSPointerEvent) => any;
    onmspointerover: (ev: MSPointerEvent) => any;
    onmspointerup: (ev: MSPointerEvent) => any;
    ontouchcancel: (ev: TouchEvent) => any;
    ontouchend: (ev: TouchEvent) => any;
    ontouchmove: (ev: TouchEvent) => any;
    ontouchstart: (ev: TouchEvent) => any;
    onwebkitfullscreenchange: (ev: Event) => any;
    onwebkitfullscreenerror: (ev: Event) => any;
    outerHTML: string;
    prefix: string | null;
    scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
    scrollWidth: number;
    tagName: string;
    assignedSlot: HTMLSlotElement | null;
    slot: string;
    shadowRoot: ShadowRoot | null;
    attributes: NamedNodeMap;
    baseURI: string | null;
    childNodes: NodeList;
    firstChild: Node | null;
    lastChild: Node | null;
    localName: string | null;
    namespaceURI: string | null;
    nextSibling: Node | null;
    nodeName: string;
    nodeType: number;
    nodeValue: string | null;
    ownerDocument: Document;
    parentElement: HTMLElement | null;
    parentNode: Node | null;
    previousSibling: Node | null;
    textContent: string | null;
    ATTRIBUTE_NODE: number;
    CDATA_SECTION_NODE: number;
    COMMENT_NODE: number;
    DOCUMENT_FRAGMENT_NODE: number;
    DOCUMENT_NODE: number;
    DOCUMENT_POSITION_CONTAINED_BY: number;
    DOCUMENT_POSITION_CONTAINS: number;
    DOCUMENT_POSITION_DISCONNECTED: number;
    DOCUMENT_POSITION_FOLLOWING: number;
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
    DOCUMENT_POSITION_PRECEDING: number;
    DOCUMENT_TYPE_NODE: number;
    ELEMENT_NODE: number;
    ENTITY_NODE: number;
    ENTITY_REFERENCE_NODE: number;
    NOTATION_NODE: number;
    PROCESSING_INSTRUCTION_NODE: number;
    TEXT_NODE: number;
    onpointercancel: (ev: PointerEvent) => any;
    onpointerdown: (ev: PointerEvent) => any;
    onpointerenter: (ev: PointerEvent) => any;
    onpointerleave: (ev: PointerEvent) => any;
    onpointermove: (ev: PointerEvent) => any;
    onpointerout: (ev: PointerEvent) => any;
    onpointerover: (ev: PointerEvent) => any;
    onpointerup: (ev: PointerEvent) => any;
    onwheel: (ev: WheelEvent) => any;
    childElementCount: number;
    firstElementChild: Element | null;
    lastElementChild: Element | null;
    nextElementSibling: Element | null;
    previousElementSibling: Element | null;

    addEventListener(event, listener: (event: Electron.LoadCommitEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.DidFailLoadEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.DidFrameFinishLoadEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.DidGetResponseDetailsEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.DidGetRedirectRequestEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.PageTitleUpdatedEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.PageFaviconUpdatedEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.ConsoleMessageEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.FoundInPageEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.NewWindowEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.WillNavigateEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.DidNavigateEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.DidNavigateInPageEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.IpcMessageEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.PluginCrashedEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.DidChangeThemeColorEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.UpdateTargetUrlEvent) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener(event, listener: (event: Electron.Event) => void, useCapture?: boolean): this;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof ElementEventMap>(type: K, listener: (ev: ElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    addEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;

    removeEventListener(event, listener: (event: Electron.LoadCommitEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.DidFailLoadEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.DidFrameFinishLoadEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.DidGetResponseDetailsEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.DidGetRedirectRequestEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.PageTitleUpdatedEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.PageFaviconUpdatedEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.ConsoleMessageEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.FoundInPageEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.NewWindowEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.WillNavigateEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.DidNavigateEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.DidNavigateInPageEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.IpcMessageEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.PluginCrashedEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.DidChangeThemeColorEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.UpdateTargetUrlEvent) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener(event, listener: (event: Electron.Event) => void): this;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof ElementEventMap>(type: K, listener: (ev: ElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    removeEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;

    canGoBack(): boolean;

    canGoForward(): boolean;

    canGoToOffset(offset: number): boolean;

    capturePage(callback: (image: Electron.NativeImage) => void): void;
    capturePage(rect: Electron.Rectangle, callback: (image: Electron.NativeImage) => void): void;

    clearHistory(): void;

    closeDevTools(): void;

    copy(): void;

    cut(): void;

    delete(): void;

    executeJavaScript(code: string, userGesture?: boolean, callback?: (result: any) => void): void;

    findInPage(text: string, options?: Electron.FindInPageOptions): number;

    getTitle(): string;

    getURL(): string;

    getUserAgent(): string;

    getWebContents(): Electron.WebContents;

    goBack(): void;

    goForward(): void;

    goToIndex(index: number): void;

    goToOffset(offset: number): void;

    insertCSS(css: string): void;

    insertText(text: string): void;

    inspectElement(x: number, y: number): void;

    inspectServiceWorker(): void;

    isAudioMuted(): boolean;

    isCrashed(): boolean;

    isDevToolsFocused(): boolean;

    isDevToolsOpened(): boolean;

    isLoading(): boolean;

    isWaitingForResponse(): boolean;

    loadURL(url: string, options?: Electron.LoadURLOptions): void;

    openDevTools(): void;

    paste(): void;

    pasteAndMatchStyle(): void;

    print(options?: Electron.PrintOptions): void;

    printToPDF(options: Electron.PrintToPDFOptions, callback: (error: Error, data: Buffer) => void): void;

    redo(): void;

    reload(): void;

    reloadIgnoringCache(): void;

    replace(text: string): void;

    replaceMisspelling(text: string): void;

    selectAll(): void;

    send(channel: string, ...args: any[]): void;

    sendInputEvent(event: any): void;

    setAudioMuted(muted: boolean): void;

    setUserAgent(userAgent: string): void;

    setZoomFactor(factor: number): void;

    setZoomLevel(level: number): void;

    showDefinitionForSelection(): void;

    stop(): void;

    stopFindInPage(action): void;

    undo(): void;

    unselect(): void;

    blur(): void;

    click(): void;

    dragDrop(): boolean;

    focus(): void;

    msGetInputContext(): MSInputMethodContext;

    getAttribute(name: string): string | null;

    getAttributeNode(name: string): Attr;

    getAttributeNodeNS(namespaceURI: string, localName: string): Attr;

    getAttributeNS(namespaceURI: string, localName: string): string;

    getBoundingClientRect(): ClientRect;

    getClientRects(): ClientRectList;

    getElementsByTagName<K extends keyof ElementListTagNameMap>(name: K): any;
    getElementsByTagName(name: string): NodeListOf<Element>;

    getElementsByTagNameNS(namespaceURI, localName: string): HTMLCollectionOf<HTMLElement>;
    getElementsByTagNameNS(namespaceURI, localName: string): HTMLCollectionOf<SVGElement>;
    getElementsByTagNameNS(namespaceURI: string, localName: string): HTMLCollectionOf<Element>;

    hasAttribute(name: string): boolean;

    hasAttributeNS(namespaceURI: string, localName: string): boolean;

    msGetRegionContent(): MSRangeCollection;

    msGetUntransformedBounds(): ClientRect;

    msMatchesSelector(selectors: string): boolean;

    msReleasePointerCapture(pointerId: number): void;

    msSetPointerCapture(pointerId: number): void;

    msZoomTo(args: MsZoomToOptions): void;

    releasePointerCapture(pointerId: number): void;

    removeAttribute(qualifiedName: string): void;

    removeAttributeNode(oldAttr: Attr): Attr;

    removeAttributeNS(namespaceURI: string, localName: string): void;

    requestFullscreen(): void;

    requestPointerLock(): void;

    setAttribute(name: string, value: string): void;

    setAttributeNode(newAttr: Attr): Attr;

    setAttributeNodeNS(newAttr: Attr): Attr;

    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): void;

    setPointerCapture(pointerId: number): void;

    webkitMatchesSelector(selectors: string): boolean;

    webkitRequestFullscreen(): void;

    webkitRequestFullScreen(): void;

    getElementsByClassName(classNames: string): NodeListOf<Element>;

    matches(selector: string): boolean;

    closest(selector: string): Element | null;

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;

    scroll(options?: ScrollToOptions): void;
    scroll(x: number, y: number): void;

    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;

    scrollBy(options?: ScrollToOptions): void;
    scrollBy(x: number, y: number): void;

    insertAdjacentElement(position: InsertPosition, insertedElement: Element): Element | null;

    insertAdjacentHTML(where: InsertPosition, html: string): void;

    insertAdjacentText(where: InsertPosition, text: string): void;

    attachShadow(shadowRootInitDict: ShadowRootInit): ShadowRoot;

    appendChild<T extends Node>(newChild: T): T;

    cloneNode(deep?: boolean): Node;

    compareDocumentPosition(other: Node): number;

    contains(child: Node): boolean;

    hasAttributes(): boolean;

    hasChildNodes(): boolean;

    insertBefore<T extends Node>(newChild: T, refChild: Node | null): T;

    isDefaultNamespace(namespaceURI: string | null): boolean;

    isEqualNode(arg: Node): boolean;

    isSameNode(other: Node): boolean;

    lookupNamespaceURI(prefix: string | null): string | null;

    lookupPrefix(namespaceURI: string | null): string | null;

    normalize(): void;

    removeChild<T extends Node>(oldChild: T): T;

    replaceChild<T extends Node>(newChild: Node, oldChild: T): T;

    dispatchEvent(evt: Event): boolean;

    querySelector<K extends keyof ElementTagNameMap>(selectors: K): ElementTagNameMap[K] | null;
    querySelector<E extends Element>(selectors: string): E | null;

    querySelectorAll<K extends keyof ElementListTagNameMap>(selectors: K): any;
    querySelectorAll<E extends Element>(selectors: string): NodeListOf<Element>;

    remove(): void;
}

enum WSB_PERMISSION{
    MEDIA = 'media',
    GEOLOCATION = 'geolocation',
    NOTIFICATION = 'notification',
    MIDI_SYSEX = 'midiSysex',
    POINTER_LOCK = 'pointerLock',
    FULLSCREEN = 'fullscreen',
    OPEN_EXTERNAL = 'openExternal'
}

class WSB{

    private element:WebView;

    constructor(url:string="about:blank"){
        let w = document.createElement('webview');
        w.src = url;
        w.setAttribute('disableguestresize','');
        w.setAttribute('webpreferences','sandbox=true, experimentalFeatures=true, experimentalCanvasFeatures=true');
        w.setAttribute('partition','persist:web');
        w.setAttribute('plugins','true');
        w.setAttribute('blinkFeatures','CSSVariables,KeyboardEventKey,CSSBackdropFilter,CSSVariables2,ExperimentalV8Extras');
        this.element = w;
    }

    public setup(tm:TabManager,td:TabData){
        let remote = require('electron').remote;
        let {dialog} = remote;

        this.setUpContextMenu(this.element,tm,td);

        // handle downloads
        this.element.getWebContents().session.addListener("will-download", (event2, item, webContents) => {

            let itemToDownload = new HomeBrowser.DLManager.DL( item.getFilename() , item.getURL() );

            item.on('updated',(event3, state) => {
                let prc = ( item.getReceivedBytes() / item.getTotalBytes() ) * 100;
                itemToDownload.updateProgress(prc,state);
                itemToDownload.isPaused = item.isPaused();
            });

            item.once("done",(event3, state) => {
                itemToDownload.complete(state);
            });

            HomeBrowser.DLManager.register(itemToDownload);

        });
        this.element.getWebContents().session.setCertificateVerifyProc(function(request:CertificateVerifyProcRequest,callback:(verificationResult:number)=>void){

            console.warn('CERT CHECK',request.hostname,request);

            if ( request.errorCode !== 0 ){

                if ( HomeBrowser.Memory.get('ignoreRequest').indexOf(request.hostname) > -1 ){
                    HomeBrowser.Memory.forget('ignoreRequest',request.hostname);
                    HomeBrowser.Memory.set('badWebsite',request.hostname);
                    callback(0);
                }
                else if (request.verificationResult !== "net::OK"){
                    HomeBrowser.Memory.set('badWebsite',request.hostname);
                    callback(-3);
                }
                else{
                    HomeBrowser.Memory.forget('badWebsite',request.hostname);
                    callback(-3);
                }

            }
            else{
                HomeBrowser.Memory.forget('badWebsite',request.hostname);
                callback(-3);
            }


        });
        // handle permission requests
        this.element.getWebContents().session.setPermissionRequestHandler(function(webContents, permission:string, callback){

            let host = (new URL( webContents.getURL() )).hostname;

            if ( HomeBrowser.Settings.security.onPermissionRequests === 'ask' ){

                if ( HomeBrowser.IO.Config.has('permission' , host) ){
                    callback( HomeBrowser.IO.Config.get( 'permission' , host ) );
                }
                else{
                    dialog.showMessageBox( remote.getCurrentWindow() , {
                        type:'question',
                        title:'Permission Request',
                        message:`${webContents.getTitle()} would like your permission to use ${permission}`,
                        buttons: ["Accept","Decline"],
                        cancelId: 1
                    } , (response)=>{
                        HomeBrowser.Support.log('PERMISSION',`Requested pemission to use ${permission}, user response was ${response !== 1}`,'permission.request');
                        HomeBrowser.IO.Config.set('permission', host , response !== 1 );
                        callback(response !== 1);
                    });

                }

            }
            else if ( HomeBrowser.Settings.security.onPermissionRequests === 'accept' ){
                HomeBrowser.Support.log('PERMISSION',`Requested pemission to use ${permission}, Default response True`,'permission.request');
                if ( HomeBrowser.IO.Config.has('permission' , host) ){
                    callback( HomeBrowser.IO.Config.get( 'permission' , host ) );
                }else{
                    callback(true)
                }
            }
            else{
                HomeBrowser.Support.log('PERMISSION',`Requested pemission to use ${permission}, Default response False`,'permission.request');
                callback(false)
            }

        });
    }

    private setUpContextMenu(w:WebView,tm:TabManager,td:TabData){

        let {Menu,MenuItem,MenuSeperator} = HomeBrowser.VisualAdapter;
        let {clipboard,nativeImage,remote} = require('electron');
        let webContent = w.getWebContents();

        webContent.on('context-menu',(ev,prop)=>{
            ev.preventDefault();

            let editFlags = prop.editFlags;
            let M = new Menu();

            if (editFlags.canUndo){
                M.append( new MenuItem('Undo',()=>{
                    webContent.undo();
                }) );
            }
            if (editFlags.canRedo){
                M.append( new MenuItem('Redo',()=>{
                    webContent.redo();
                }) );
            }
            if (editFlags.canUndo || editFlags.canRedo){
                M.append( new MenuSeperator() );
            }
            if (prop.mediaType === "image"){
                M.append( new MenuItem('Download Image as...', ()=>{
                        webContent.downloadURL(prop.srcURL);
                }) );
                M.append( new MenuItem('View Image',()=>{
                        tm.newTab( prop.srcURL );
                }) );
                M.append( new MenuItem('Copy Image',()=>{
                        webContent.copyImageAt(prop.x,prop.y);
                }) );
                M.append( new MenuItem('Copy Image Address',()=>{
                        clipboard.writeText( prop.srcURL );
                }) );
                M.append( new MenuSeperator() );
            }
            if ( prop.linkURL.length > 0 ){
                M.append( new MenuItem('Open in New Tab',()=>{
                        tm.newTab(prop.linkURL);
                }) );
                M.append( new MenuSeperator() );
            }

            if (editFlags.canSelectAll){
                M.append( new MenuItem('Select All',()=>{
                    webContent.selectAll();
                }) );
            }
            if (editFlags.canCopy){
                M.append( new MenuItem('Copy',()=>{
                    webContent.copy();
                }) );
            }
            if (editFlags.canCut) {
                M.append(new MenuItem('Cut',()=>{
                    webContent.cut();
                }) );
            }
            if (editFlags.canPaste){
                M.append( new MenuItem('Paste',()=>{
                    webContent.paste();
                }) );
            }
            if (editFlags.canCut || editFlags.canPaste || editFlags.canSelectAll || editFlags.canCopy){
                M.append( new MenuSeperator() );
            }


            M.append( new MenuItem('Back', ()=>{
                td.navigate.goBack()
            },{
                disabled: !w.canGoBack()
            }) );

            M.append( new MenuItem('Forward',()=>{
                td.navigate.goForward();
            },{
                disabled: !w.canGoForward()
            }) );

            M.append( new MenuSeperator() );

            M.append( new MenuItem('Inspect',()=>{
                    console.log('toggle inspect');
                    w.inspectElement(prop.x,prop.y);
            }) );

            M.popup(webContent,ev,{
                x:prop.x,
                y:prop.y
            });

        });

    }

    private _setUpContextMenu(w:WebView,tm:TabManager,td:TabData){

        // TODO: set up context menu for the webview;
        let {Menu,MenuItem,dialog} = require('electron').remote;
        let {clipboard,nativeImage,remote} = require('electron');
        let fs = require('fs');
        let path = require('path');
        let webContent = w.getWebContents();

        webContent.on('context-menu',(ev,prop)=>{

            ev.preventDefault();

            console.log(prop);

            let editFlags = prop.editFlags;
            let M = new Menu();


            if (editFlags.canUndo){
                M.append( new MenuItem({
                    role:'undo'
                }) );
            }
            if (editFlags.canRedo){
                M.append( new MenuItem({
                    role:'redo'
                }) );
            }

            if (editFlags.canUndo || editFlags.canRedo){
                M.append( new MenuItem({ type:'separator' }) );
            }

            if (prop.mediaType === "image"){
                M.append( new MenuItem({
                    label:'Download Image as...',
                    click: ()=>{
                        webContent.downloadURL(prop.srcURL);
                    }
                }) );
                M.append( new MenuItem({
                    label:'View Image',
                    click: ()=>{
                        tm.newTab( prop.srcURL )
                    }
                }) );
                M.append( new MenuItem({
                    label:'Copy Image',
                    click: ()=>{
                        webContent.copyImageAt(prop.x,prop.y);
                    }
                }) );
                M.append( new MenuItem({
                    label:'Copy Image Address',
                    click: ()=>{
                        clipboard.writeText( prop.srcURL );
                    }
                }) );
                M.append( new MenuItem({ type:'separator' }) );
            }

            if ( prop.linkURL.length > 0 ){
                M.append( new MenuItem({
                    label:'Open in New Tab',
                    click: ()=>{
                        tm.newTab(prop.linkURL);
                    }
                }) );
                M.append( new MenuItem({ type:'separator' }) );
            }

           if (editFlags.canSelectAll){
               M.append( new MenuItem({
                   role:'selectall'
               }) );
           }
           if (editFlags.canCopy){
               M.append( new MenuItem({
                   role:'copy'
               }) );
           }
            if (editFlags.canCut) {
                M.append(new MenuItem({
                    role: 'cut'
                }));
            }
            if (editFlags.canPaste){
                M.append( new MenuItem({
                    role:'paste'
                }) );
            }
            if (editFlags.canCut || editFlags.canPaste || editFlags.canSelectAll || editFlags.canCopy){
                M.append( new MenuItem({ type:'separator' }) );
            }


            M.append( new MenuItem({
                label:'Back',
                click: ()=>td.navigate.goBack(),
                enabled: w.canGoBack()
            }) );
            M.append( new MenuItem({
                label:'Forward',
                click: ()=>td.navigate.goForward(),
                enabled: w.canGoForward()
            }) );

            M.append( new MenuItem({ type:'separator' }) );

            M.append( new MenuItem({
                label:'Inspect',
                click: ()=>{
                    console.log('toggle inspect');
                    w.inspectElement(prop.x,prop.y);
                }
            }) );

            M.popup({
                window:remote.getCurrentWindow(),
                callback:()=>{
                    console.log('CLOSE MENU');
                }
            });
        });

    }

    goTo(url:string){
        this.element.loadURL(url);
    }

    get View(){
        return this.element;
    }

}