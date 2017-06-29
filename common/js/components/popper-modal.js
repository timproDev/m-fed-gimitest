/*
*
* Pop Modal
* 
* 
*/
;(function( $ ) {
	$.fn.popper = function( options ) {
		//set default accessible options
		var defaults = {
				bgName: "reveal-modal-bg-white",
				modalId: "#modalWindow",
				modalClass: ".modal",
				modalType: "default",
				closeModal: ".status-icon",
				altClass: "",
				dynamicEvent: false,//add a dynamic Event listener for the customClone feature, i.e. jQuery .on method or other function
				customClone: false,
				openCallback: function(){}
		};
		var settings = $.extend( {}, defaults, options );
		//initializing private variables
		var src,
		content = {}, 
		flag = true,
		bgClass = "." + settings.bgName,
		$modalWindow = $(settings.modalId),
		bgEl = $(document.createElement("div")),
		modalName = settings.modalClass.split(".").join("");
		
		//check whether the background element has been created and add it, if necessary
		if ( !$(bgClass).length ) {
			bgEl.addClass(settings.bgName).appendTo('body');
		} else {
			bgEl = $("." + settings.bgName);
		}
		//close function. 
		//Hide background and remove injected HTML elements
		var _close = function() {
			bgEl.hide();
			var $pop = $(settings.modalId + " " + settings.modalClass);            
			$(settings.modalId).animate({"left": "-100%"}, 200, "swing", 
					function() {
						$(this).css({display: "none", visibility: "invisible"});
						$pop.remove();
					});
		};
		//open function
		//Add missing event listeners and open the lightbox by appending to the modalWindow id
		var _open = function(self){
			if(flag) {
				var $modalWindow = $(settings.modalId);
				$modalWindow.on("click", settings.modalClass, 
						function(e) {
							//e.preventDefault();
							e.stopPropagation();
						});
				$modalWindow.on("click", settings.closeModal, 
						function(e) {
							//e.stopPropagation();
							//console.log("closing from stat icon");
							_close();
						});
                // enhance js for opti-in; include option for disabling modal close
                if (settings.modalType === "disableClose") {
                    $(".reveal-modal-bg-white").off("click");
                } else {
                    $(".reveal-modal-bg-white, " + settings.modalId).on("click", //".modal",						
                        function(e) {
							//console.log("target is = " + e.target.className);                            
							if ( !$(e.target).is(settings.modalId + " " + settings.modalClass) ) {
								_close();
							}
							//e.stopPropagation();
						});
                }
                if ( $( "a" + settings.modalClass ).length ) {
					$( "a" + settings.modalClass ).click(function(e) {
						e.preventDefault();
					});
				}
				flag = false;
			}
			//custom modalTypes can be defined to manipulate the value of the content var
			//if no modalType is defined by user, it will use the default content process
			//adding another if else here with a new modalType string will extend and customize
			//the data associated with that modalType            
			if ( settings.modalType === "iframe" ) {
				src = self.find(".video");
				var srcPath = src.data("src");
				//var container = $(document.createElement("div")).addClass("i-container modal");
				//var container = $("<div class='i-container modal'>" + "<span class='status-icon'>" + "X" + "</span>" + "</div");
                var container = $("<div class='i-container modal'>" + "<span class='status-icon'>" + "</span>" + "</div");
				var $iframeEl = $(document.createElement("iframe"));
				$iframeEl = $iframeEl.attr({
					"src": srcPath,
					"webkitallowfullscreen": "",
					"mozallowfullscreen": "",
					"allowfullscreen": ""
				});
				content = container.append($iframeEl);
			}
			else if (settings.modalType === "lazyimages") {
				src = self.find(".lazyimg");//.data("src");
				
                var srcPath = src.data("src");
				var hrefPath = src.data("href");
                var $aTag1 = $(document.createElement("a"));
                //console.log("lazy image function");
                $aTag1 = $aTag1.attr({
                    "href" : hrefPath,
                    "target" : "_blank"                    
                });                
                var $imgEl = $(document.createElement("img"));
				$imgEl = $imgEl.attr({
					"src": srcPath,
					"alt": "modal image"
				});                
				content = self.clone().append($imgEl);
                $imgEl.wrap($aTag1);
			}
			else if ( settings.customClone ) {
				content = $(settings.customClone).clone().attr("class", settings.modalName);
				$(settings.modalId).addClass(settings.altClass);
			}
			else if ( settings.modalType === "default" ) {
				content = self.clone();			
			}
			bgEl.fadeIn(200, function(){
				content.appendTo(settings.modalId).addClass("open");//.animate({"left": "+=68%"}, 200, "swing");
				$(settings.modalId).css({display: "block", visibility: "visible"}).animate({"left": "+=100%"}, settings.slideSpeed, "swing");
				/*if (settings.dynamicEvent) {
					console.log("hey I just added a dynamic event");
					settings.dynamicEvent();
				}*/
				settings.openCallback();
			});
			
		};
		this.on( "click", settings.modalClass, function(e){
			e.preventDefault();
			var $self = $(this);
			_open($self);
		});
		return this;
	};
})(jQuery);