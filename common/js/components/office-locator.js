/*
*
* Global Office Locator
* handles hide and show of different set of office locations
*
*/

;(function( $ ) {
	$.fn.officeLocator = function( options ) {
		var _t = this;
		//_t.defaults = {};
		//_t.settings = $.extend( {}, _t.defaults, options );
		return _t.each(function(){
			$(_t).find(".drop-menu a").click(function(e){
				e.preventDefault();				
				var $dataId = $("div[data-id='" + e.target.id + "']");
				if ( !$dataId.hasClass("active") ) {
					$("div.active").removeClass("active");
					$dataId.addClass("active");
				}
			});
		});
	};
})(jQuery);