/*
*
* Social Network Code for
* Twitter and Facebook Sharing
* 
* 
*/

;(function( $ ) {
	$.fn.socialplugs = function() {
		var _t = this;
		return _t.each(function(){
			//Facebook Share
			(function(d, s, id) {
			        var js, fjs = d.getElementsByTagName(s)[0];
			        if (d.getElementById(id)) return;
			        js = d.createElement(s); js.id = id;
			        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=394666330615263&version=v2.0";
			        fjs.parentNode.insertBefore(js, fjs);
			    }(document, 'script', 'facebook-jssdk'));
			//Twitter Share
			!function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http'
						: 'https';
				if (!d.getElementById(id)) {
					js = d.createElement(s);
					js.id = id;
					js.src = p + '://platform.twitter.com/widgets.js';
					fjs.parentNode.insertBefore(js, fjs);
				}
			}(document, 'script', 'twitter-wjs');
		});
	}
})(jQuery);