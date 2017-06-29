//Search Results Header Drop Down
;(function( $ ) {
	$.fn.searchlister = function() {
		var _t = this;
		
		return _t.each(function(){
			//refresh page with scroll position set to 0
			//TODO: verify that the scroll position reset can be removed. 
			$(window).on('beforeunload', function() {
			    $(window).scrollTop(0);
			});	
			var infinitescroller = _t.infinitescroll();
			infinitescroller.loadItems();
		});
	};
	$(".search-drop").click(function(e){
		e.preventDefault();
		var $openSubs = $(".search-drop.open, .search-menu.open");
		var $self = $(this);
		searchClickHandler($openSubs, $self);
	
	});
	function searchClickHandler($openSubs, $self) {
		if($openSubs.length === 0){
			$self.addClass("open").next(".search-menu").addClass("open");	
		} else if ($self.hasClass("open")) {
			$self.removeClass("open").next(".search-menu").removeClass("open");
		} else {
			$openSubs.removeClass("open");
			$self.addClass("open").next(".search-menu").addClass("open");
		}
		$(".search-drop.open, .search-menu.open").click(function(e){
			e.stopPropagation();
		});
	}
	$(".facets .sub-menu a").click(function(e){
		e.preventDefault();
		var $self = $(this);
		var textSelection = $self.text();
		var dataSelection = $self.data("facet");
		$self.closest(".facets")
			.find(".current-filter a")
			.text(textSelection)
			.siblings("input")
			.val(dataSelection);
	});	
})(jQuery);