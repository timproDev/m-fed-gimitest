if ($("#g-recaptcha").length) {
	var onloadCallback = function() {
		
		grecaptcha.render("g-recaptcha", {
			"sitekey" : $("#siteKey").val(),
			"callback" : captchaSuccess
		});
	};
	var captchaSuccess = function(response) {
		if($("#captchaCheck").length) {
			$("#captchaCheck").val(Boolean(response)).attr("disabled", true).valid();
		}
		if(typeof guideBridge !== 'undefined' && guideBridge) { 
	        guideBridge.visit(function(cmp) {
	            if(cmp.name == "g-recaptcha-response-af") {	
					guideBridge.setProperty([cmp.somExpression], "value", [$("#g-recaptcha-response").val()]);	
	            }
	        });
		}
		//$("#captchaCheck").valid();
	};
}




