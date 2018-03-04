/// <reference path="../../../node_modules/electron-prebuilt-compile/electron.d.ts"/>
var WSB_PERMISSION;
(function (WSB_PERMISSION) {
    WSB_PERMISSION["MEDIA"] = "media";
    WSB_PERMISSION["GEOLOCATION"] = "geolocation";
    WSB_PERMISSION["NOTIFICATION"] = "notification";
    WSB_PERMISSION["MIDI_SYSEX"] = "midiSysex";
    WSB_PERMISSION["POINTER_LOCK"] = "pointerLock";
    WSB_PERMISSION["FULLSCREEN"] = "fullscreen";
    WSB_PERMISSION["OPEN_EXTERNAL"] = "openExternal";
})(WSB_PERMISSION || (WSB_PERMISSION = {}));
class WSB {
    constructor(url = "about:blank") {
        let w = document.createElement('webview');
        w.src = url;
        w.setAttribute('disableguestresize', '');
        w.setAttribute('webpreferences', 'sandbox=true, experimentalFeatures=true, experimentalCanvasFeatures=true');
        w.setAttribute('partition', 'persist:web');
        w.setAttribute('plugins', 'true');
        w.setAttribute('blinkFeatures', 'CSSVariables,KeyboardEventKey,CSSBackdropFilter,CSSVariables2,ExperimentalV8Extras');
        this.element = w;
    }
    setup(tm, td) {
        let remote = require('electron').remote;
        let { dialog } = remote;
        this.setUpContextMenu(this.element, tm, td);
        // handle downloads
        this.element.getWebContents().session.addListener("will-download", (event2, item, webContents) => {
            let itemToDownload = new HomeBrowser.DLManager.DL(item.getFilename(), item.getURL());
            item.on('updated', (event3, state) => {
                let prc = (item.getReceivedBytes() / item.getTotalBytes()) * 100;
                itemToDownload.updateProgress(prc, state);
                itemToDownload.isPaused = item.isPaused();
            });
            item.once("done", (event3, state) => {
                itemToDownload.complete(state);
            });
            HomeBrowser.DLManager.register(itemToDownload);
        });
        this.element.getWebContents().session.setCertificateVerifyProc(function (request, callback) {
            console.warn('CERT CHECK', request.hostname, request);
            if (request.errorCode !== 0) {
                if (HomeBrowser.Memory.get('ignoreRequest').indexOf(request.hostname) > -1) {
                    HomeBrowser.Memory.forget('ignoreRequest', request.hostname);
                    HomeBrowser.Memory.set('badWebsite', request.hostname);
                    callback(0);
                }
                else if (request.verificationResult !== "net::OK") {
                    HomeBrowser.Memory.set('badWebsite', request.hostname);
                    callback(-3);
                }
                else {
                    HomeBrowser.Memory.forget('badWebsite', request.hostname);
                    callback(-3);
                }
            }
            else {
                HomeBrowser.Memory.forget('badWebsite', request.hostname);
                callback(-3);
            }
        });
        // handle permission requests
        this.element.getWebContents().session.setPermissionRequestHandler(function (webContents, permission, callback) {
            let host = (new URL(webContents.getURL())).hostname;
            if (HomeBrowser.Settings.security.onPermissionRequests === 'ask') {
                if (HomeBrowser.IO.Config.has('permission', host)) {
                    callback(HomeBrowser.IO.Config.get('permission', host));
                }
                else {
                    dialog.showMessageBox(remote.getCurrentWindow(), {
                        type: 'question',
                        title: 'Permission Request',
                        message: `${webContents.getTitle()} would like your permission to use ${permission}`,
                        buttons: ["Accept", "Decline"],
                        cancelId: 1
                    }, (response) => {
                        HomeBrowser.Support.log('PERMISSION', `Requested pemission to use ${permission}, user response was ${response !== 1}`, 'permission.request');
                        HomeBrowser.IO.Config.set('permission', host, response !== 1);
                        callback(response !== 1);
                    });
                }
            }
            else if (HomeBrowser.Settings.security.onPermissionRequests === 'accept') {
                HomeBrowser.Support.log('PERMISSION', `Requested pemission to use ${permission}, Default response True`, 'permission.request');
                if (HomeBrowser.IO.Config.has('permission', host)) {
                    callback(HomeBrowser.IO.Config.get('permission', host));
                }
                else {
                    callback(true);
                }
            }
            else {
                HomeBrowser.Support.log('PERMISSION', `Requested pemission to use ${permission}, Default response False`, 'permission.request');
                callback(false);
            }
        });
    }
    setUpContextMenu(w, tm, td) {
        let { Menu, MenuItem, MenuSeperator } = HomeBrowser.VisualAdapter;
        let { clipboard, nativeImage, remote } = require('electron');
        let webContent = w.getWebContents();
        webContent.on('context-menu', (ev, prop) => {
            ev.preventDefault();
            let editFlags = prop.editFlags;
            let M = new Menu();
            if (editFlags.canUndo) {
                M.append(new MenuItem('Undo', () => {
                    webContent.undo();
                }));
            }
            if (editFlags.canRedo) {
                M.append(new MenuItem('Redo', () => {
                    webContent.redo();
                }));
            }
            if (editFlags.canUndo || editFlags.canRedo) {
                M.append(new MenuSeperator());
            }
            if (prop.mediaType === "image") {
                M.append(new MenuItem('Download Image as...', () => {
                    webContent.downloadURL(prop.srcURL);
                }));
                M.append(new MenuItem('View Image', () => {
                    tm.newTab(prop.srcURL);
                }));
                M.append(new MenuItem('Copy Image', () => {
                    webContent.copyImageAt(prop.x, prop.y);
                }));
                M.append(new MenuItem('Copy Image Address', () => {
                    clipboard.writeText(prop.srcURL);
                }));
                M.append(new MenuSeperator());
            }
            if (prop.linkURL.length > 0) {
                M.append(new MenuItem('Open in New Tab', () => {
                    tm.newTab(prop.linkURL);
                }));
                M.append(new MenuSeperator());
            }
            if (editFlags.canSelectAll) {
                M.append(new MenuItem('Select All', () => {
                    webContent.selectAll();
                }));
            }
            if (editFlags.canCopy) {
                M.append(new MenuItem('Copy', () => {
                    webContent.copy();
                }));
            }
            if (editFlags.canCut) {
                M.append(new MenuItem('Cut', () => {
                    webContent.cut();
                }));
            }
            if (editFlags.canPaste) {
                M.append(new MenuItem('Paste', () => {
                    webContent.paste();
                }));
            }
            if (editFlags.canCut || editFlags.canPaste || editFlags.canSelectAll || editFlags.canCopy) {
                M.append(new MenuSeperator());
            }
            M.append(new MenuItem('Back', () => {
                td.navigate.goBack();
            }, {
                disabled: !w.canGoBack()
            }));
            M.append(new MenuItem('Forward', () => {
                td.navigate.goForward();
            }, {
                disabled: !w.canGoForward()
            }));
            M.append(new MenuSeperator());
            M.append(new MenuItem('Inspect', () => {
                console.log('toggle inspect');
                w.inspectElement(prop.x, prop.y);
            }));
            M.popup(webContent, ev, {
                x: prop.x,
                y: prop.y
            });
        });
    }
    _setUpContextMenu(w, tm, td) {
        // TODO: set up context menu for the webview;
        let { Menu, MenuItem, dialog } = require('electron').remote;
        let { clipboard, nativeImage, remote } = require('electron');
        let fs = require('fs');
        let path = require('path');
        let webContent = w.getWebContents();
        webContent.on('context-menu', (ev, prop) => {
            ev.preventDefault();
            console.log(prop);
            let editFlags = prop.editFlags;
            let M = new Menu();
            if (editFlags.canUndo) {
                M.append(new MenuItem({
                    role: 'undo'
                }));
            }
            if (editFlags.canRedo) {
                M.append(new MenuItem({
                    role: 'redo'
                }));
            }
            if (editFlags.canUndo || editFlags.canRedo) {
                M.append(new MenuItem({ type: 'separator' }));
            }
            if (prop.mediaType === "image") {
                M.append(new MenuItem({
                    label: 'Download Image as...',
                    click: () => {
                        webContent.downloadURL(prop.srcURL);
                    }
                }));
                M.append(new MenuItem({
                    label: 'View Image',
                    click: () => {
                        tm.newTab(prop.srcURL);
                    }
                }));
                M.append(new MenuItem({
                    label: 'Copy Image',
                    click: () => {
                        webContent.copyImageAt(prop.x, prop.y);
                    }
                }));
                M.append(new MenuItem({
                    label: 'Copy Image Address',
                    click: () => {
                        clipboard.writeText(prop.srcURL);
                    }
                }));
                M.append(new MenuItem({ type: 'separator' }));
            }
            if (prop.linkURL.length > 0) {
                M.append(new MenuItem({
                    label: 'Open in New Tab',
                    click: () => {
                        tm.newTab(prop.linkURL);
                    }
                }));
                M.append(new MenuItem({ type: 'separator' }));
            }
            if (editFlags.canSelectAll) {
                M.append(new MenuItem({
                    role: 'selectall'
                }));
            }
            if (editFlags.canCopy) {
                M.append(new MenuItem({
                    role: 'copy'
                }));
            }
            if (editFlags.canCut) {
                M.append(new MenuItem({
                    role: 'cut'
                }));
            }
            if (editFlags.canPaste) {
                M.append(new MenuItem({
                    role: 'paste'
                }));
            }
            if (editFlags.canCut || editFlags.canPaste || editFlags.canSelectAll || editFlags.canCopy) {
                M.append(new MenuItem({ type: 'separator' }));
            }
            M.append(new MenuItem({
                label: 'Back',
                click: () => td.navigate.goBack(),
                enabled: w.canGoBack()
            }));
            M.append(new MenuItem({
                label: 'Forward',
                click: () => td.navigate.goForward(),
                enabled: w.canGoForward()
            }));
            M.append(new MenuItem({ type: 'separator' }));
            M.append(new MenuItem({
                label: 'Inspect',
                click: () => {
                    console.log('toggle inspect');
                    w.inspectElement(prop.x, prop.y);
                }
            }));
            M.popup({
                window: remote.getCurrentWindow(),
                callback: () => {
                    console.log('CLOSE MENU');
                }
            });
        });
    }
    goTo(url) {
        this.element.loadURL(url);
    }
    get View() {
        return this.element;
    }
}
//# sourceMappingURL=WebSB.js.map