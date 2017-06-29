//Create Cookies 
;(function( $ ) {
	$.fn.cookiejar = function( options ) {
		var _t = this;
		return _t.each(function(){
			var currentDate = new Date();
			var expire = new Date(currentDate.getTime()+365*86400000).toUTCString();
			$(".region-selector-list a").click(function(){
				document.cookie = "marshCountrySite=" + $(this).attr("href")  + "; expires=" + expire;
			});
			
		});
	};
})(jQuery);