/*
*
* Code for Sniffing Browser User Agents
* Also adds cookie to remove browser upgrade message request
* 
*/
//return array with browser and version
navigator.sayswho = (function(){
    var ua = navigator.userAgent, tem, 
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if(M[1] === 'Chrome'){
        tem = ua.match(/\bOPR\/(\d+)/);
        if(tem != null) return 'Opera ' + tem[1];
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M;
})();


//check that returned array is a lower version than required
if ((navigator.sayswho[0] === "Chrome" && navigator.sayswho[1] <= 37)
       || (navigator.sayswho[0] === "Firefox" && navigator.sayswho[1] <= 32)
       || (navigator.sayswho[0] === "MSIE" && navigator.sayswho[1] <= 8)) {
       //use regex to determine if cookie to remove alert is in the browser
       var browserCookie = document.cookie.replace(/(?:(?:^|.*;\s*)browserAlert\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
       if (browserCookie !== "remove") {                 
           $(".browser-comp-alert").show();
             //add event listener for closing the banner
             $("#cancelAlert, #closeAlert").click(function(e){
                    e.preventDefault();
                    $(".browser-comp-alert").hide();
                    if ( $(this).attr("id") === "cancelAlert" ) {                    
                           createCookie("browserAlert","remove",1000,false);
                           //document.cookie = "browserAlert=remove";
                    }
                    if ( $(this).attr("id") === "closeAlert" ) {
                           createCookie("browserAlert","remove","",false);
                    }
             });
       }
}