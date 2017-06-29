$(document).ready(function(e) {
	$(document).foundation();
	jQuery.validator.addMethod("pwdRestrictions", function(value, element) {
		return /^(?=(?:[^A-Za-z]*[A-Za-z]){4})(?=\S*$)(?=.*\d)(?!.*(?=[A-Z])\1{2}|(?=[a-z])\1{2}|(?=[0-9-+_!@#$%^&*.,?])\1{2})(?=(?=.*[-+_!@#$%^&*.,?])|(?=.*[A-Z])(?=.*[a-z])).{8,15}$/.test(value);
		//return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*([A-Za-z0-9-+_!@#$%^&*.,?])\1{2})(?=.*[-+_!@#$%^&*.,?]).{8,15}$/.test(value);
	});
	$("#logIn, #resetPswd").validate({
		rules: {
			username: {
				required: true
			},
			log_password: {
				required: true
			}
		},
        messages: {
			username: $("#usernameRequired").data("message") || jQuery.validator.messages.required,
			log_password: $("#passwordRequired").data("message") || jQuery.validator.messages.required
        },
		errorClass: "error-flag",
		onfocusout: false,
		onkeyup: false
    });
	$("#resetTempPswd").validate({
		rules: {
            temp_password: {
                required: true   
            },
            password_entry: {
                required: true, 
                pwdRestrictions: true
            },
            confirm_password: {
                required: true,
                equalTo: "#newPassword"
            }
		},
        messages: {
			temp_password: $("#tempPassRequired").data("message") || jQuery.validator.messages.required,
            password_entry: {
            	required: $("#passwordRequired").data("message") || jQuery.validator.messages.required,
            	pwdRestrictions: $("#passwordRestrictions").data("message") || jQuery.validator.messages.required
            },
            confirm_password: {
            	required: $("#confirmPassRequired").data("message") || jQuery.validator.messages.required,
            	equalTo: $("#confirmPassAlert").data("message") || jQuery.validator.messages.required
            }
        },
		errorClass: "error-flag",
		onfocusout: function(element) {
			$(element).valid();
		},
		onkeyup: false
    });
});
