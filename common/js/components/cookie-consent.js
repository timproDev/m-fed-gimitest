function cookieAlert() {
	
	var $cookieBtn = $(".cookie-consent .btn"),
		$container = $(".cookie-consent").show();
	
	$cookieBtn.on('click', function(event){ 
		
		createCookie("consentCookie", "consentAlert", 90, false);
		event.preventDefault();    
		$container.hide();
		
	});    

}

	
function isConsent(){
		var consentCookie = document.cookie.replace(/(?:(?:^|.*;\s*)consentAlert\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		if(readCookie("consentCookie") != "consentAlert"){
            cookieAlert();
		}
}

isConsent();