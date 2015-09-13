var frontendPlaySites;
var ClipperIndex = 0;
var DropMenu = $.parseHTML('<div id="DropMenu"><ul id="MenuWrap"><li class="MenuItem">Copy To Clipboard</li><li class="MenuItem">Save </li></div>');
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
            if(validBlock(ele)){
            ClipperIndex++;
            var $Clipperbtn = CreateClipper(ClipperIndex);
            var ClipperLeft=$(ele).offset().left+$(ele).outerWidth()-90;
            var clipperTop=$(ele).offset().top;
            $Clipperbtn.css({
                'z-index':9999,
                'left':ClipperLeft,
                'top':clipperTop
            });
            $('body').append($Clipperbtn);
            $(ele).attr('data-ClipperHooked',true);
            }
        }
    });
}
function validBlock(ele){
    if($(ele).css('display') == 'none' || $(ele).outerWidth()<100){ 
        return false;
        }
        else{
            return true ;
        }
}
function CreateClipper(index) {
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
        if (mutation.type == 'childList' || mutation.type == 'subtree') {
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
