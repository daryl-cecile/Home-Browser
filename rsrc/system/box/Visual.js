var HomeBrowser;
(function (HomeBrowser) {
    let Visual;
    (function (Visual) {
        function capture(data) {
            let wv = data.tabWebElement.View;
            let r = data.tabWebElement.View.getBoundingClientRect();
            let el = require('electron');
            wv.capturePage({
                x: 0,
                y: 0,
                width: parseInt((r.width * el.screen.getPrimaryDisplay().scaleFactor).toString()),
                height: parseInt((r.height * el.screen.getPrimaryDisplay().scaleFactor).toString())
            }, (img) => {
                //require('electron').screen.getPrimaryDisplay().scaleFactor
                let fs = HomeBrowser.IO.FS.NFS;
                let path = require('path');
                let buffer = img.toJPEG(90);
                fs.writeFile(path.join(HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserCache, HomeBrowser.Security.currentSessionID, 'tab_' + data.id + '.jpeg'), buffer, () => {
                    HomeBrowser.Support.log('CAPTURED', 'WebContent capture performed', 'visual.capture');
                    setTimeout(() => {
                        HomeBrowser.Broadcaster.broadcast('capture ready', {
                            tab_data: data,
                            preview: path.join(HomeBrowser.IO.HomeBrowserPaths.directory_paths.HomeBrowserCache, HomeBrowser.Security.currentSessionID, 'tab_' + data.id + '.jpeg')
                        });
                    }, 1000);
                });
            });
        }
        Visual.capture = capture;
    })(Visual = HomeBrowser.Visual || (HomeBrowser.Visual = {}));
})(HomeBrowser || (HomeBrowser = {}));
//# sourceMappingURL=Visual.js.map