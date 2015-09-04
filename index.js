//SDK file import
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var panels = require("sdk/panel");
var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var jsonData = self.data.load('frontendPlaySites/sitesList.json');
//Browser Button
var button = buttons.ActionButton({
    id: "CodeClipper",
    label: "Code Clipper",
    icon: {
        "16": "./Icons/Code-16.png",
        "32": "./Icons/Code-32.png",
        "64": "./Icons/Code-64.png"
    },
    onClick: handleClick
});
//Action Button panel
var panel = panels.Panel({
    contentURL: self.data.url("panel/panel.html"),
});
//Loading Content scripts
pageMod.PageMod({
    include: "*",
    contentScriptFile: [self.data.url('scripts/contentScripts/jquery-2.1.4.min.js'),
        self.data.url("scripts/contentScripts/pageLoad.js")],
    contentStyleFile: self.data.url("Styles/App.css"),
    attachTo: ["existing", "top"],
    onAttach: function (worker) {
        worker.port.on("FrontendSitesListReq", function (data) {
            worker.port.emit("FrontendSitesListRes", jsonData);
        });
    }
});
//Action button click handler
function handleClick(state) {
    panel.show({
        position: button
    });
}
