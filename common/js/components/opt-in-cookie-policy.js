// Opt-In Cookie Policy

function optinModal(req, expDays) {
    
    var modType,
        altClass,
        currentCookie = getCookieValue("optinSettingType"),
        $radios = $('input[name="settingType"]');      

    cookieDependencies();
    
    // set popper.js custom method modal type based on required argument
    if (req == "required") {
        modType = "disableClose";
        altClass = "alt-opt-secure";        
    } else if (req == "notrequired") {
        modType = "";
        altClass = "alt-opt-nonsecure";
    }        
    
    // initialize popper.js modal
    $("#optIn").popper({
         customClone: ".opt-in-modal",
         altClass: altClass,
         modalType:modType,
         openCallback: function(){            
             $("#modalWindow #optInModal").validate({
                showErrors: function( error, element ) {
                    return true;
                },
                rules: {
                   settingType: {
                         required: true,
                   }
                },
                onclick: function(){
                    $('.submit-button').addClass("enable");                    
                    cookieDependencies();
                },
                submitHandler: function(){
                    deleteOptCookie("optinSettingType");
                    var radioVal = $('input[name="settingType"]:checked').val();
                    if(radioVal < 200) {
                        setOptCookie("disableAA", "true", "/", "");
                    }
                    radioVal = radioVal.toString();
                    setOptCookie("optinSettingType", radioVal, "/","");

                    currentCookie = radioVal;
                    cookieDependencies();
                    var pageC = $('#pageC').val();
                    if (pageC != undefined && pageC != "") {    
                    
                        var url = pageC + ".cookiepolicy.json?nocache=nocache";
                        $.ajax({
                            type : 'GET',
                            url : url,
                            success : function(data) {
                                console.log('ajax call success');
                            },
                            error : function() {
                                console.log('Error while executing ajax call');
                            }
                        });
                    }
                }
            });
            showMore();            
        }
    });
        
    // enable/disable submit and cancel button based on selection and presence
    // dependent on popper click event function
    if (req == "required") {
        if (currentCookie == null) {
            $('.submit-button').addClass("enable");
            $("#optIn .modal").click();
        } else {
            $(".btn-wrap p.status-icon").addClass("enable");            
        }
    } else if (req == "notrequired") {
        if (currentCookie == null) {
            $('.submit-button').addClass("enable");
            $("#optIn .modal").click();
        }
    }            
    
    // Slide UpDown of detailed content - cookie Details
    // height of hidden details are based on the height of the container
    // the extra space (25) is to account of the view more link
    function showMore() {        
        var $content = $("#modalWindow .cookieDetails"),
            $showBtn = $("#modalWindow .view-details"),
            $showHeight = $showBtn.outerHeight(),
            modHeight = $("#optInModal").outerHeight();
        
        modHeight = modHeight - $showHeight;
                
        var hidePos = "-" + modHeight;                    
        
        $content.css({
            bottom: hidePos + "px",
            height: modHeight + "px"
        });
        
        $("#modalWindow").on("click", ".view-details", function(){
            if($content.hasClass("show")) {                
                $content.animate({
                        bottom: hidePos
                    }, 200)
                    .removeClass("show");
            } else {                
                $content.animate({
                        bottom: 0
                    }, 150)
                    .addClass("show");
            }
        });
    }
    
    // check cookie status | check the cookie
    // precheck cookie and set radio button
    // set related Option list to visible with class 'active'
    function cookieDependencies() {                        

        var val;
        if (currentCookie == null) {
            // default selected radio value
            val = 300;
        } else {            
            val = currentCookie;
            // if already selected but no http request, show the cancel option
            $(".btn-wrap p.status-icon").addClass("enable");
        }                
        
        // set active radio and active list as per cookie value
        var currentRadio = $radios.filter('[value=' + val + ']'),
            radioId = currentRadio.attr('id'),
            listId = "#" + radioId + "list",
            domUls = $(".opt-in-modal .option-details ul"),
            domList = ".opt-in-modal" + " " + listId;
        
        domUls.removeClass('active');
        $(domList).addClass('active');
        currentRadio.prop('checked', true);
        $(listId).addClass('active');                
        
        $("#modalWindow").on('click', 'input[name="settingType"]', function(){            
            var selectedId = $(this).attr('id');
            var selectedlistId = "#" + selectedId + "list";
            $("#modalWindow .option-details ul").removeClass('active');            
            $(selectedlistId).addClass('active');            
        });
    }
        
    function getCookieValue(cookieName) {
        var cookieValue = document.cookie;
        var cookieStartsAt = cookieValue.indexOf(" " + cookieName + "=");        
        if (cookieStartsAt == -1) {
            cookieStartsAt = cookieValue.indexOf(cookieName + "=");
        }
        
        if (cookieStartsAt == -1) {
            cookieValue = null;
        } else {
            cookieStartsAt = cookieValue.indexOf("=", cookieStartsAt) + 1;
            var cookieEndsAt = cookieValue.indexOf(";", cookieStartsAt);
            if (cookieEndsAt == -1) {
                cookieEndsAt = cookieValue.length;
            }
            cookieValue = decodeURI(cookieValue.substring(cookieStartsAt, cookieEndsAt));  
        }        
        return cookieValue;
    };

    function deleteOptCookie(cookieName) {
        document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    function setOptCookie(cookieName, cookieValue, cookiePath, cookieExpires) {
        cookieName = encodeURI(cookieName);
        if (cookieExpires == "") {
            var currentDate = new Date();
            if (expDays !== undefined) {
                currentDate.setDate(currentDate.getDate() + parseInt(expDays,10));
                cookieExpires = currentDate.toUTCString();
            } else {
                cookieExpires = "";
            }            
        }
        if (cookiePath != "") {
            cookiePath = ";path=" + cookiePath;
        }
        document.cookie = cookieName + "=" + cookieValue + ";expires=" + cookieExpires + cookiePath ;
    };    
};
