var frontendPlaySites;
var DropMenu = $.parseHTML('<div id="DropMenu"><ul id="MenuWrap"><li class="MenuItem">Copy to Clipboard</li><li class="MenuItem">Save to Disk</li></div>');
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
    InitiateDropDown();
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
function InitiateDropDown(){
  $(document).on("click", ".Drop", function (event) {
		if ($(this).hasClass('hasDropMenu')) {
			$('#DropMenu').remove();
			$(this).removeClass('hasDropMenu');
			event.stopPropagation();
		} else {
			$('#DropMenu').remove();
			$('.hasDropMenu').removeClass('hasDropMenu');
			var CurrentClipperOffset=$(this).parent().offset();
			$(DropMenu).css({top: CurrentClipperOffset.top+25, left: CurrentClipperOffset.left, position:'absolute'});
			$('body').append($(DropMenu));
			$(DropMenu).show();
			$(this).addClass('hasDropMenu');
			event.stopPropagation();
		}
	});
	$(document).on("click", "html", function () {
		$('#DropMenu').hide();
		$('.hasDropMenu').removeClass('hasDropMenu');
	});  
}
