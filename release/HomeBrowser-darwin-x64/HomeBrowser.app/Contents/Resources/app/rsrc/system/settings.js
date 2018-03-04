var HomeBrowser;
(function (HomeBrowser) {
    function show() {
        require('electron').remote.getGlobal('showWindow')();
    }
    HomeBrowser.show = show;
})(HomeBrowser || (HomeBrowser = {}));
//# sourceMappingURL=settings.js.map