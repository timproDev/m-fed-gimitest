/*
*
* Info Accordion
* Javascript for info accordion
* 
*/
//add class to animate css transform 

$(".info-accordion h5, .utility-accordion h5, .locator-accordion h5").click(function(e){
	var $self = $(this),
		$currAccordion = $self.parents(".accordion-item");
		$activeState = $(".accordion-item.active");			
	if($activeState.length === 0){
		$currAccordion.addClass("active");		
	} else if ($currAccordion.hasClass("active")) {
		$currAccordion.removeClass("active");
	} else {
		$activeState.removeClass("active");
		$currAccordion.addClass("active");		
	}
});



//;(function( $ ) {
//	$.fn.accordion = function() {
//		var _t = this,
//			$t = $(this);
//		
//		return _t.each(function(){
//			var _s = this;
//			$("h5", _s).each(function(){
//				var $s = $(this);
//				$s.click(function(e){
//					var $self = $(this),
//						//$backup = $(this),
//						$currAccordion = $s.parents(".accordion-item");
//						$activeState = $(".accordion-item.active");
//					if($activeState.length === 0){
//						$self = $(this);
//						$currAccordion.addClass("active");		
//					} else if ($currAccordion.hasClass("active")) {
//						$currAccordion.removeClass("active");
//					} else {
//						$t.height($t.height());
//						$('html,body').animate({
//							scrollTop: $(_s).offset().top
//						}, 100);
//						$activeState.removeClass("active");
//						$currAccordion.addClass("active");		
//					}
//					$activeState.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
//						function(e) {
//							if ($self !== null) {
//								$t.css("height", "");
//								$('html,body').animate({
//									scrollTop: $self.offset().top
//								}, 200);
//								
//								$self = null;
//							} else {
//								$self = $(this);
//								$t.css("height", "");
//								$('html,body').animate({
//									scrollTop: $self.offset().top
//								}, 200);
//								
//							}
//						});	
//				});
//			});
//		});
//	};	
//})(jQuery);
//
//$(".info-accordion").accordion();