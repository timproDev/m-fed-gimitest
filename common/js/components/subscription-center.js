;(function ($) {
	var formFuncs = {
	    settings: {	        
	        checkboxInput: 'input[type=checkbox]',	        
	        htmlAppendcontainer: '.user-selections',
	        timerValue: 100	        
	    },
	    accordion: function(elem){
	    	$elem = $(elem);
	    	$elem.each(function(){
	    		$(this).on('click', function(){	    			
		    		$(this).next('.f-sect-wrap').slideToggle({
		    			duration: 250,
		    			complete: function(){		    				
		    				$(this).prev().toggleClass('arrow-up');
		    			}
		    		});
		    	});
	    	});	    	
	    },
	    postSubform: function(el){
	    	//START Subscription Center rt rail form
		    $("#subcenterSubscribe").validate({
				//debug: true,
				rules: {
					first_name: {
						required: true
					},
					last_name: {
						required: true
					},
					email_address: {
						required: true,
						email: true						
					}
				},
				messages: {					
					required: $("#requiredAlert").data("message") || jQuery.validator.messages.required,
					first_name: $("#firstNameAlert").data("message") || jQuery.validator.messages.required,
		            last_name: $("#lastNameAlert").data("message") || jQuery.validator.messages.required,
		            captcha: $("#captchaAlert").data("message") || jQuery.validator.messages.required
				},
				errorClass: "error-flag",
				ignore: "",
				onkeyup: false,
				onfocusout: function(element) {
					$(element).valid();
					var $submit = $("#subcenterSubscribe #subscriptionButton");
					if($("#subcenterSubscribe").valid()){
						$submit.removeClass("disabled");
						$submit.prop('disabled', false);
					} else {
						$submit.addClass("disabled");
						$submit.prop('disabled', true);
					}
				}
			});

		    // post on submit and present confirmation message
		    $(el).submit(function(event) {
				event.preventDefault();				
				var $form = $(this),
				 	$formWrapper = $(".subscription-center-form"),
					$submit = $formWrapper.find("#subscriptionButton"),
					$confirmMess = $formWrapper.find(".f-client-msg.f-hide"),
					inputVals = $form.serialize(),
					formUrl = $form.attr('action');

				$.post(formUrl, inputVals)				
				.success(
					function(){
						// animate the confirmation sequence					
						setTimeout(function(){
							$form.fadeOut();
						}, 200);
						setTimeout(function(){							
							$confirmMess.slideDown().removeClass("f-hide");
						}, 1500);
						console.log(inputVals);						
					})
				.error(
					function(){
						console.error('Unsuccessful submission - did not work');
						// show hide error message
						console.log('oh! nope, didnt work');
					})
				.done(function(){});
			});
	    },
	    postProfile: function(el){
	    	var self = this;
		    //START Subscription Center Profile
		    $("#subcenterProfile").validate({				
				rules: {
					first_name: {
						required: true
					},
					last_name: {
						required: true
					},
					email_address: {
						required: true,
						email: true						
					},
					captcha: {
						captchaCheck: true
					}
				},
				messages: {
					required: $("#requiredAlert").data("message") || jQuery.validator.messages.required,
					first_name: $("#firstNameAlert").data("message") || jQuery.validator.messages.required,
		            last_name: $("#lastNameAlert").data("message") || jQuery.validator.messages.required,
		            captcha: $("#captchaAlert").data("message") || jQuery.validator.messages.required
				},
				errorClass: "error-flag",
				ignore: "",
				onkeyup: false,
				onfocusout: function(element) {
					$(element).valid();
					var $submit = $("#subcenterProfile #subscriptionButton");
					if($("#subcenterProfile").valid()){
						$submit.removeClass("disabled");
						$submit.prop('disabled', false);
					} else {
						$submit.addClass("disabled");
						$submit.prop('disabled', true);
					}
				}
			});

		    // post on submit and present confirmation message
	    	$(el).submit(function(event) {
				event.preventDefault();				
				var $form = $(this),
					$formWrapper = $(".subscription-center-form"),
					inputVals = $form.serialize(),
					$confirmMess = $form.find('.f-client-msg.confirm.f-hide'),
					$invalidMess = $form.find('.f-client-msg.invalid.f-hide'),
					formUrl = $form.attr('action'),
					$submit = $formWrapper.find("#subscriptionButton");
				
				$.post(formUrl, inputVals)				
				.success(function(){
					// animate the confirmation sequence					
					$confirmMess.slideDown('fast');
					setTimeout(function(){
						$confirmMess.slideUp('fast');
					}, 4000);
				})
				.error(
					function(){
						console.error('Unsuccessful submission - did not work');
						// show hide error message
						$invalidMess.slideDown('fast');
						setTimeout(function(){
							$invalidMess.slideUp('fast');
						}, 4000);
					})
				.done(function(){					
					$submit.addClass("disabled");
					$submit.prop('disabled', true);
				});
			});

	    	// if an update has been make then toggle submit disable
	    	$(el).find('input, select').on('change', function(){
	    		// console.log('changed');
	    		var $submit = $("#subcenterProfile #subscriptionButton");
	    		if ($submit.prop('disabled') == true) {
	    			$submit.removeClass("disabled");
	    			$submit.prop('disabled', false);
	    		}
	    	});

	    },
	    selectAll: function(elem){	    	
		    $(elem).on('click', function(){
	    		var $parentEl = $(this).closest(".row"),
		    		parentInputs = $parentEl.find("input[type=checkbox]"),
		    		parentInputsvalid = $parentEl.find("input[type=checkbox]:checked");
	    		// $(parentInputs).prop("checked", true).change();
    			if ($(this).data("toggle") === "select") {
    				if (parentInputs.length == parentInputsvalid.length) {
    					console.log('all checked: return');
    					return;
    				} else {
    					$(parentInputs).prop("checked", true).change();
    				}
		    	
		    	} else if ($(this).data("toggle") === "clear") {
		    		$(parentInputs).prop("checked", false).change();
		    	}
	    	});		    	 
	    },
	    init: function(el){
	        var self = this;
	        var $el = $(el);
	        self.selectAll(".select-opt span");
		    self.accordion('.showhide .f-sect-header');		    
	    }
	};    
	formFuncs.init('.subscription-center-form');	
	formFuncs.postProfile('#subcenterProfile');	
	formFuncs.postSubform('#subcenterSubscribe');	
})(jQuery);