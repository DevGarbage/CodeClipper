var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var panels = require("sdk/panel");
var self = require("sdk/self");

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

var panel = panels.Panel({
  contentURL: self.data.url("panel/panel.html"),
});
function handleClick(state) {
    panel.show({
      position: button
    });
}
