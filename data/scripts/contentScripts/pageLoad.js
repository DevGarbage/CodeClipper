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
    AddClipperInCode();
}
function FrontendPlayWebPage() {
    alert('frontend play site');
}
function AddClipperInCode() {
    $('pre').each(function (index, ele) {
        var btnstr = '<div class="wrap"><div class="clip"><i class="fa fa-code"></i> Clip</div><div class="Drop"><i class="fa fa-caret-down"></i></div></div>';
        var $btn = $.parseHTML(btnstr);
        $($btn).css("float", "right");
        $($btn).css('z-index', 9999);
        $(ele).prepend($btn);

    });
}
