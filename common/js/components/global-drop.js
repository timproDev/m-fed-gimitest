/*

Global Drop

*/

var globalDrop = {
	dropDown:	function() 
		{
			var $regionLink = $(".drop-nav-set a");
			var $regionList = $(".region-selector-list");
			var $regionWrap = $(".region-wrap");
			            
			$regionWrap.hide();
			
			$regionLink.click(function(e) {
				e.preventDefault();
				
				var $self = $(this);
				var dataAttr = $self.attr("data-nav");
				var $activeRegion = $(".drop-nav-set a.active");
				var activeAttr = $activeRegion.attr("data-nav");
				var $wrapState = $(".region-wrap[data-region='" + activeAttr + "']");
				var $altSelf = $self.add(".drop-nav-set a[data-nav='" + dataAttr + "']");
								
				if($(".drop-nav-set a.active").length === 0){
					//$self.addClass("active");
					$altSelf.addClass("active");		
					$(".region-wrap[data-region='" + dataAttr + "']").slideDown();		
				//} else if ($self.hasClass("active")) {
				} else if ($altSelf.hasClass("active")) {
					$wrapState.slideToggle();
					//$self.removeClass("active");
					$altSelf.removeClass("active");
				} else {
					$activeRegion.removeClass("active");
					//$self.addClass("active");
					$altSelf.addClass("active");
					$wrapState.slideUp(function() {
						//$(".region-wrap[data-region='" + dataAttr + "']" + " .region-wrap[data-region='" + dataAttr + "']").slideDown();
						$(".region-wrap[data-region='" + dataAttr + "']").slideDown();
						//console.log(".region-wrap[data-region='" + dataAttr + "'] " + ".region-selector-list:before");
					});
				}
			});
		},
	init: 		function() 
				{
					globalDrop.dropDown();            			
				}
};

