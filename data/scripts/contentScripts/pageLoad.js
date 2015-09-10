var frontendPlaySites;
var ClipperIndex = 0;
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
    WatchDynamicCodeBlock();
    InitiateDropDown();
}
function FrontendPlayWebPage() {
    alert('frontend play site');
}
function AddClipperInCode() {
    $('pre').each(function (index, ele) {
        var HookedStatus = $(ele).attr('data-ClipperHooked');
        if (HookedStatus == "true") { }
        else {
            ClipperIndex++;
            var $Clipperbtn = CreateClipper(ClipperIndex);
            $Clipperbtn.css("float", "right");
            $Clipperbtn.css('z-index', 9999);
            $(ele).prepend($Clipperbtn);
            $(ele).attr('data-ClipperHooked', true);
        }
    });

}
function CreateClipper(index) {
    //'<div class="wrap"><div class="clip"><i class="fa fa-code"></i> Clip</div><div class="Drop"><i class="fa fa-caret-down"></i></div></div>';
    var $Wrapper = $('<div/>');
    $Wrapper.addClass('CCwrap');
    $Wrapper.attr('data-WrapIndex', index);

    var $Clipbtn = $('<div/>');
    $Clipbtn.addClass('clip');
    $Clipbtn.text('Clip');
    $Clipbtn.attr('data-ClipIndex', index);
    var $ClipIcon = $('<i class="fa fa-code"></i>');
    $Clipbtn.prepend($ClipIcon);

    var $Dropbtn = $('<div/>');
    $Dropbtn.addClass('Drop');
    $Dropbtn.attr('data-DropIndex', index);
    var $DropIcon = $('<i class="fa fa-caret-down">');
    $Dropbtn.append($DropIcon);

    $Wrapper.append($Clipbtn);
    $Wrapper.append($Dropbtn);

    return $Wrapper;

}
function InitiateDropDown() {
    $(document).on("click", ".Drop", function (event) {
        if ($(this).hasClass('hasDropMenu')) {
            $('#DropMenu').remove();
            $(this).removeClass('hasDropMenu');
            event.stopPropagation();
        } else {
            $('#DropMenu').remove();
            $('.hasDropMenu').removeClass('hasDropMenu');
            var CurrentClipperOffset = $(this).parent().offset();
            $(DropMenu).css({ top: CurrentClipperOffset.top + 25, left: CurrentClipperOffset.left, position: 'absolute' });
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
function WatchDynamicCodeBlock() {
    var target = $(document);
    var config = {
        childList: true,
        subtree: true,
    };
    observer.observe(target[0], config);
}
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type == 'childList' || mutation.type == 'subtree') { // If there are new nodes added
            $.each(mutation.addedNodes, function (index, value) {
                if (value.nodeName == "PRE") {
                    AddClipperInCode();
                }
                else {

                }

            });

        } else {
        }
    });
});
