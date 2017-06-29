/*
*
* Twitter List Animation
* Javascript for Twitter List Component. Fades in and Fades out. 
* Extend functionality using OO js.
*
*/
//var counter = 0;
/*var twitterList = {
	tweetInterval: null,
	fadeOutIn: 	function()	
				{
					var $tweetList = $('#tweetList > li');
					var tweetLength = $tweetList.length;
					var currTweet = 0;
					
					$tweetList.hide();
					
					$tweetList.eq(currTweet).fadeIn(500);
					this.tweetInterval = setInterval(function(){
						console.log("Interval set here");
						if ( currTweet < tweetLength - 1 ) {
							$tweetList.eq(currTweet).fadeOut(0, function(){ 
								currTweet++;
								$tweetList.eq(currTweet).fadeIn(500);
							});
						} else {
							$tweetList.eq(currTweet).fadeOut(0, function() {
								currTweet = 0;
								$tweetList.eq(currTweet).fadeIn(500);
							});
						}
						//counter++;
						
					},  4000);
					//function fadeInTweet() {
						//$tweetList.eq(currTweet).fadeIn(500);
					//}
					//function fadeOutTweet() {
						//$tweetList.eq(currTweet).fadeOut(0);
					//}
				},
		
	init: 		function() 
				{
					console.log("init me = " + this.tweetInterval);
					if (this.tweetInterval != null) {
						clearInterval(this.tweetInterval);
					}
					this.fadeOutIn();
				}
};*/
;(function( $ ) {
	$.fn.tickertweet = function( options ) {
		//set default accessible options
		//var defaults = {};
		//var settings = $.extend( {}, defaults, options );
		var _t = this;
		var currTweet = 0;
		var $tweetList = $('#tweetList > li');
		//$tweetList.hide();
		//$tweetList.eq(currTweet).fadeIn(500);
		$tweetList.eq(currTweet).addClass("fade-in");
		function twitterTick() {
			if ($tweetList[currTweet] !== $tweetList[$tweetList.length - 1]) {
				//$tweetList.eq(currTweet).fadeOut(0, function(){
					//currTweet++;
					//$tweetList.eq(currTweet).fadeIn(500);
				//});
				$tweetList.eq(currTweet).removeClass("fade-in");
				currTweet++;
				$tweetList.eq(currTweet).addClass("fade-in");
			} else {
				//$tweetList.eq(currTweet).fadeOut(0, function() {
					//currTweet = 0;
					//$tweetList.eq(currTweet).fadeIn(500);
				//});
				$tweetList.eq(currTweet).removeClass("fade-in");
				currTweet = 0;
				$tweetList.eq(currTweet).addClass("fade-in");
			}
		}
		return _t.each(function(){
			setInterval(twitterTick, 4000);
		});
	};
})(jQuery);

