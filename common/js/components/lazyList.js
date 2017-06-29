;(function($){
	var lazyList = {
		setAttr: function(el, attrs){
	        for(var key in attrs) {
	            el.setAttribute(key, attrs[key]);
	        }
	    },   
	    addImg: function(elem){	    	
	    	if (!$(elem).find("img").length) {    		
	    		var clipSrc = $(elem).data("src");
		    	var imgEl = document.createElement('img');
				// Set Dyn element attributes
				this.setAttr(imgEl, {			
					"src": clipSrc,
					"class": "showimg"
				});
				$(elem).append(imgEl);
				$(elem).data("src", "");			
				setTimeout(function(){
					$(imgEl).addClass("visiblefade");				
				}, 300);

	    	}				
	    },
	    checkSetting: function(obj){
	    	// check scrollPos and pos of element
	    	var winHeight = $(window).height();
			var docHeight = $(document).height();
			var	offsetTop   = $(obj).offset().top;
			var	scrollPosY = $(window).scrollTop();	        	
			var itemPos = offsetTop - scrollPosY;
	    	if (itemPos <= winHeight) {
	    		this.addImg(obj);
	    	}	    		    	
	    },
	    init: function(el){	
	    	var self = this,
	    		$spFig = $(el).find(".sp-item.imgopt figure");		

			$spFig.each(function(){
				var $this = $(this);
				// load images on scroll
				$(window).scroll(function(e) {
					self.checkSetting($this);
				});
				// load images on page load
				document.addEventListener("DOMContentLoaded", function(){
		   			self.checkSetting($this);
				});
				// window resize, refire event
				$(window).resize(function(){
					self.checkSetting($this);
				});
			});

			
			$("body").on({
				'touchmove': function(e) {
					 self.checkSetting($this);
				}
			});			
		} 	
	}	
	//Init
	lazyList.init(".shared-people-list");

})(jQuery);

// access/init popper plugin
$(".shared-people-list.jsopt").popper();
