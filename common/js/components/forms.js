/*
*
* Forms (Cancel/Close Window,etc...)
* 
* 
*/
//TODO: Verify this code for removal
/*$(".form-structure .close").click(function(){
	var $self = $(this);
	//$activeState = $(".filter-wrap button.active");	
	
    
//Scripts may close only the windows that were opened by it.

});*/

//Handle switching between input and select tag dependng on country selected.
//united states is the only value that will have a required select field
;(function( $ ) {
	$.fn.formswitch = function( options ) {
		var _t = this;
		return _t.each(function(){
			var selectTag 	= $("#region").clone();
			$canRegion 	= $("#canadaRegion");
			var canSelect = $canRegion.clone();
			$canRegion.remove();
			_t.change(function(){
				var options 	= document.getElementById("countrySelection").options,
					optionId	= options[options.selectedIndex].id,
					$region 	= $("#region, #canadaRegion"),
					$regionName = $region.attr("name"),
					inputTag 	= $("<input>", {
									type: "text",
									id: "region",
									name: $regionName,
									value: ""
								  });
				if (optionId === "united-states-of-america") {		
					$region.replaceWith(selectTag);
					$("#regions label span").show();
				} else if (optionId === "canada") {
					$region.replaceWith(canSelect);		
					$("#canadaRegion,#regions label span").show();
				} else {
					$region.replaceWith(inputTag);
					$("#regions label span").hide();
					$("#region").valid();
				}
				if ($("#regions label.error-flag").length || $("#regions select.error-flag").length) {
					$("#regions label.error-flag").remove();
					$("#regions select.error-flag").removeClass();	
				}
			});
			_t.change();
		});
	};
})(jQuery);

