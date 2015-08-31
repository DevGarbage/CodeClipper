var frontendPlaySites;
$(document).ready(function () {
    isFrontendPlaySite();
});
function isFrontendPlaySite() {
    self.port.emit("FrontendSitesListReq");
}
self.port.on("FrontendSitesListRes", function (jsonData) {
    frontendPlaySites = jsonData;
    var FrontendPlaySite = false;
    var hostName = $(location).attr('hostname');
    $.each(JSON.parse(frontendPlaySites), function (key, val) {
        if (val.hostname == hostName) {
            FrontendPlaySite = true;
        }
    });
    if (FrontendPlaySite) {
        FrontendPlayWebPage();
    }
    else {
        CommonWebPage();
    }
});
function CommonWebPage() {
    alert('common');
}
function FrontendPlayWebPage() {
    alert('frontend play site');
}
