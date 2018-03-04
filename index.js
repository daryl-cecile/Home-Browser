const { app, BrowserWindow, webContents, protocol } = require('electron');
const path = require('path');
const url = require('url');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let closeWindow = false;
app.commandLine.appendSwitch("disable-renderer-backgrounding");
protocol.registerStandardSchemes(['home'], {
    secure: true
});
function createWindow() {
    let shown = false;
    closeWindow = false;
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // frame:false,
        show: false,
        // transparent:true,
        // vibrancy:'ultra-dark',
        // vibrancy:'light',
        titleBarStyle: "hiddenInset",
        webPreferences: {
            experimentalFeatures: true
        }
    });
    // protocol.interceptHttpProtocol('home',(request:InterceptHttpProtocolRequest, callback:(redirectRequest:RedirectRequest)=>void) => {
    //     console.log('intercepted',request);
    //     callback({
    //         url:'https://www.encrypted.google.co.uk/',
    //         method:request.method
    //     })
    // },error => {
    //     console.error('intError',error);
    // });
    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'rsrc', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Open the DevTools.
    // win.webContents.openDevTools();
    global['openDevTools'] = () => {
        win.webContents.openDevTools();
    };
    global['showWindow'] = () => {
        win.show();
        shown = true;
    };
    global['resizeWC'] = (w = -1, h = -1) => {
        const [width, height] = win.getContentSize();
        if (w === -1)
            w = width;
        if (h === -1)
            h = height;
        for (let wc of webContents.getAllWebContents()) {
            if (wc.hostWebContents && wc.hostWebContents.id == win.webContents.id) {
                wc.setSize({
                    normal: {
                        width: w,
                        height: h
                    }
                });
            }
        }
    };
    win.on('resize', () => {
        BROADCAST('main update', 'resize');
        setTimeout(() => {
            BROADCAST('main update', 'resize');
        }, 400);
    });
    win.on("scroll-touch-begin", (e, a) => {
        BROADCAST('main swipe', {
            'start': 1
        });
    });
    win.on("scroll-touch-end", (e) => {
        BROADCAST('main swipe', {
            start: 0
        });
    });
    win.on('app-command', (e, cmd) => {
        BROADCAST('main command', cmd);
    });
    win.on('close', (e) => {
        if (closeWindow !== true) {
            e.preventDefault();
            e.returnValue = 0;
            win.hide();
            BROADCAST('main requests', 'close');
        }
    });
    // Emitted when the window is closed.
    win.on('closed', (e) => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    win.on('ready-to-show', () => {
        setTimeout(() => {
            // force show if window doesnt appear within the first 10 seconds
            if (shown === true)
                return;
            win.show();
            win.webContents.openDevTools();
        }, 10 * 1000);
    });
}
global['killWindow'] = () => {
    closeWindow = true;
    win.close();
};
function BROADCAST(message, data) {
    win.send('HOME_BROADCAST', message, data);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null || closeWindow === true) {
        createWindow();
    }
});
app.on('before-quit', () => {
    closeWindow = true;
});
//# sourceMappingURL=index.js.map