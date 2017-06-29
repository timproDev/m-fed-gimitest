/*
*
* Infinite Scroll
* Javascript for infinite scroll
* 
*/

;(function( $ ) {
	$.fn.infinitescroll = function() {
		var _t = this,
			docHeight,
			scrollPos,
			topOffset,
			$nextPage = $( "#nextPage" ),
			state = true,
			articlesHeight = 0,
			target = ".infinite-scroll-item",
			loadCue = $("<span id='loadCue'>" + "</span>"),
			hrefRequest;
		
		_t.loadItems = function() {	
			if(!$("#loadCue").length){
				$(".infinite-scroll-container").append(loadCue);
			}
			if (hrefRequest === $nextPage.attr("href")) {
				hrefRequest = false;
				return false;
			}
			hrefRequest = $nextPage.attr("href");
			$.ajax({
		        url: $nextPage.attr("href"),
		        type:'GET'
		    })
		    .done(function(html){
		    	//$("#loadingCue").hide("1000");
		    	$("#loadCue").remove();
				$( ".infinite-scroll-container" )
					.append( $( html )
					.find( target ).fadeIn(1500)
				);
				//add new link if available
				if($( html ).find("#nextPage").length !== 0) {
					$nextPage.attr("href", $( html ).find("#nextPage").attr("href"));
					state = true;
				} else {
					$nextPage.attr("href", "");
				}
		    })
		    .fail(function(html){
				console.log("Request Data Error. data = " + html);
		    });
		    return false;
		};
		return this.each(function() {			
			$(window).scroll(function(e) {
				if (!$("#nextPage").attr("href") && $("#nextPage").attr("href") === "") {
					//$("#loadingCue").hide();
					state = false;
					return;
				}
				scrollPosY = $(window).scrollTop() + $("footer").height();
				topOffset = $(document).height() - $(window).height();
				if(topOffset <= scrollPosY && state === true) {
					state = false;
					_t.loadItems();
				}
			});
		});
	};
})(jQuery);


		