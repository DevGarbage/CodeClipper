var frontendPlaySites;

$(document).ready(function () {
    isFrontendPlaySite();
});
function isFrontendPlaySite() {
     self.port.emit("FrontendSitesListReq", {
         job: 'job',
    src: 'i.src'
     });
}
self.port.on("FrontendSitesListRes", function(jsonData){
    frontendPlaySites=jsonData;
    var status = false;
    var hostName = $(location).attr('hostname');
        $.each( JSON.parse(frontendPlaySites), function (key, val) {
            if (val.hostname == hostName) {
                status = true;
            }
        });
        if((status))
    {
        FrontendPlayWebPage();
    }
    else{
        CommonWebPage();
    }
});
function CommonWebPage()
{
    alert('common');
}
function FrontendPlayWebPage(){
    alert('frontend play site');
}
