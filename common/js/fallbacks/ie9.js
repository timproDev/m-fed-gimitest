/*
*
* IE9 javascript fallbacks
* may be used for IE8 as well
*
*/

//Handle placeholder attr for IE where needed

$(document).ready(function(){
	$.placeholder.shim();
    //$(".slide-down-panel").appendTo("#mainNav");
    
    var resizeListener = function(){                  
        $(window).on("resize", function(){
            if ($(window).width() >= 1025 && $("#mainNav > .slide-down-panel").length === 0) {
                $(".slide-down-panel").clone().appendTo("#mainNav");                
            }
            if ($(window).width() >= 1025 && $("#mainNav > .slide-down-panel").length > 0) {              
                return;                
            }
            if ($(window).width() < 1025 && $("#mainNav > .slide-down-panel").length > 0) {
                $("#mainNav > .slide-down-panel").remove();
                $(".main-nav-wrap .slide-down-panel").show();
            }
        });
        
        if ($(window).width() >= 1025 && $("#mainNav > .slide-down-panel").length === 0) {
                $(".slide-down-panel").clone().appendTo("#mainNav");
                // console.log("Seeing the menu on IE9");
            }
            if ($(window).width() >= 1025 && $("#mainNav > .slide-down-panel").length > 0) {              
                return;                
            }
            if ($(window).width() < 1025 && $("#mainNav > .slide-down-panel").length > 0) {
                $("#mainNav > .slide-down-panel").remove();
                $(".main-nav-wrap .slide-down-panel").show();
        }
    }
    
    resizeListener();  
});
