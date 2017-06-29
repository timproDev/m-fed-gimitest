// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
//Set all custom form error messages by extending the messages object
//TODO: Verify that this can be removed. Most of this is getting handled in the validation initializer
/*$.extend(jQuery.validator.messages, {
	required: $("#requiredAlert").data("message") || jQuery.validator.messages.required,
	email: $("#emailAlert").data("message") || jQuery.validator.messages.email,
	equalTo: $("#equalToAlert").data("message") || jQuery.validator.messages.equalTo
});*/
$(document).ready(function(e) {
	
	// datepicker on search results template
	// $('#datepicker1').datetimepicker({
	// 	yearOffset:0,
	// 	lang:$("html").attr("lang"),
	// 	todayButton: false,	
	// 	closeOnDateSelect:true,
	// 	timepicker:false,
	// 	format:'m/d/Y',
	// 	formatDate:'m/d/Y'        
	// });
	// $('#datepicker2').datetimepicker({
	// 	yearOffset:0,
	// 	lang:$("html").attr("lang"),
	// 	todayButton: false,	
	// 	closeOnDateSelect:true,
	// 	timepicker:false,
	// 	format:'m/d/Y',
	// 	formatDate:'m/d/Y'
	// });
	//TODO: check about registering slick.js for 'reflow'
	//$(document).foundation('interchange', 'reflow');
	$(document).foundation();
	$(document).foundation('interchange', 'reflow');
	
});
// $(window).load(function() {
// 	flyoutAnimation();
// });
// function _toggleSubmit(userflag, submit_id, pswd_id) {
// 	var $submit = $(submit_id);
// 	if($(pswd_id).valid()){
// 		//Check whether user id has been verified
// 		if(userflag) {
// 			$submit.removeClass("disabled");
// 		}
// 	} else {
// 		$submit.addClass("disabled");
// 	}
// }
// function dotInits() {
// 	$(".carousel-panel p").dotdotdot();
// 	$(".carousel-panel .text-wrap div").dotdotdot();
// 	$(".author-box p").dotdotdot();
// 	$(".full-width-carousel .text-box div").dotdotdot();
// }

// function dotUpdates() {
// 	$(".carousel-panel p").trigger("update.dot");
// 	$(".carousel-panel .text-wrap div").trigger("update.dot");
// 	$(".author-box p").trigger("update.dot");
// 	$(".full-width-carousel .text-box div").trigger("update.dot");
// }	

//

