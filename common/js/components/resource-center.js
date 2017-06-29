/*
*
* Content Listing Component
* Javascript for AJAX and HTML painting of this section
*
*/
//Close all sub dropdowns if clicking outside of applicable area
//TODO: move this to the dropclickhandler js
$(document).on('click', function(event) {
	  if (!$(event.target).closest('.has-sub, .sub-menu').length) {
	    $(".has-sub.open, .sub-menu.open").removeClass("open");
	  }
	});
;(function( $ ) {
	$.fn.contentlister = function() {
		function createFiltersCookie(value,days) {
            var cookieStr =  readFilterCookie();
            var jsonArry;
            if(cookieStr != null && cookieStr != 'undefined'){
           	 	jsonArry = JSON.parse(cookieStr);
               	jsonArry = updateJSONArray(jsonArry,value);
            } else {
				jsonArry = [];
                jsonArry.push(value);
            }
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = "filters="+ JSON.stringify(jsonArry)+expires+"; path=	/";

		} ;
		function updateJSONArray(jsonArry,value) {
			for (var i = 0; i < jsonArry.length; i++) {
                    var cur = jsonArry[i];
                    if (cur.path == location.pathname) {
                        jsonArry.splice(i, 1);
                        break;
                    }
                }
            if(value!=null && value!=""){
				jsonArry.push(value);
            }
            return jsonArry;
        }
		function readFilterCookie() {
			var nameEQ = "filters=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) {
                    var str = c.substring(nameEQ.length,c.length);
                    return str;
                }
			}
			return null;
		};
        function readFilters() {
			var cookieStr =  readFilterCookie();
            var jsonArry;
            if(cookieStr != null && cookieStr != 'undefined'){
           	 	jsonArry = JSON.parse(cookieStr);
                for (var i = 0; i < jsonArry.length; i++) {
                    var cur = jsonArry[i];
                    if (cur.path == location.pathname) {
						var searchKeyWord = cur.keyword;
						$(".resource-search").val(searchKeyWord);
                        return cur.filter;
                    }
                }
            }
            return "";
        };

		var _t = this;
        // AEM Analytics
        var filterNumArray = [];
        var valArray = [];
        var resultNum;
        //
		return _t.each(function(){
			//refresh page with scroll position set to 0
			//TODO: verify that the scroll position reset can be removed. 
			//var infinitescroller = _t.infinitescroll();
			var $ajaxUrl = $("#ajaxUrl").val();
			$(window).on('beforeunload', function() {
			    $(window).scrollTop(0);
			});	
			//tablet and phone handlers for animated controller
			//animation handled through css transitions
			//These open and close the filter module
			$(".sort-mobile-face").click(function() {
					$(".faceted-container").addClass("open-animate").removeClass("close-animate");
				});
			$(".close-filter").click(function() {
					$(".faceted-container").removeClass("open-animate").addClass("close-animate");
				});
			if(!$ajaxUrl) {
				console.log("AJAX needs a url. Please provide in #ajaxUrl input tag on page");
				return;
			}
			//initial JSON request
			var loadCue = $("<span id='loadCue'>" + "</span>");
			$.ajax({
				beforeSend: function() {
					$(".infinite-scroll-container").append(loadCue);

				},
				url: $ajaxUrl,
				type: "GET",
				dataType: "json",
				data : readFilters()
			})
			.done(function( data ){
				jsonTemplate( data, function() {
					_t.infinitescroll().loadItems();
				});
				$("<form id='dynamicForm'>" + "</form>").appendTo("aside.resource-filter");                
			})
			.fail(function(){
				console.log("Request Data Error");
			});
			//Deferred and directly bounded handlers
			//filter select drop down event handler
			$(".resource-filter").on("click", ".has-sub", function( e ){
				e.preventDefault();
				//$("#finishedLoading").hide("fast");
				var $openSubs = $( ".has-sub.open, .sub-menu.open" );
				var $self = $(this);
				//dropClickHandler($openSubs, $self);
				if($openSubs.length === 0){
					$self.addClass("open").next(".sub-menu").addClass("open");	
				} else if ($self.hasClass("open")) {
					$self.removeClass("open").next(".sub-menu").removeClass("open");	
				} else {
					$openSubs.removeClass("open");
					$self.addClass("open").next(".sub-menu").addClass("open");	
				}
			});
			//clear all handler
			$(".resource-filter").on("click", "#clearAll", function( e ){
				e.preventDefault();
				//$("#finishedLoading").hide("fast");
				//getFilters();
				$(".resource-search").val("");                
                // clear the query variable to allow search on repeated value
                query = "";
				createFiltersCookie("");
				$ajax();                
			});
			//filter select click handler
			$(".resource-filter").on("click", ".sub-menu a", function( e ){
				e.preventDefault();
				//$("#finishedLoading").hide("fast"); 
				var $self = $(this),
					$href = $self.attr("href"),
					textSelection = $self.text();
				//determine whether a sort or filter was clicked
				if ($(e.target).closest("#sort").length) {	
					var textSelection = $self.text();
					$self.closest(".filter-container")
						.find(".current-filter a")
						.text(textSelection);
					$("<input name='sortBy' type='hidden' value='" + $href + "'>").appendTo("#dynamicForm");
				} else {
					$(".filter-item li[data-filter-cat*='" + $(e.target).closest('.filter-container').data('filter-cat') + "']").remove();
					$("<input name='filters' type='hidden' value='" + $href + "'>").appendTo("#dynamicForm");
					$self.closest(".filter-container")
						.find(".current-filter a")
						.text(textSelection);
				}			
				getFilters();
                var jsonObj = {"path" : location.pathname, "filter" : $("#dynamicForm").serialize() , "keyword" : ""};
				createFiltersCookie(jsonObj);
				$ajax();
			});
			$(".resource-filter").on("click", ".filtered .current-filter a", function( e ){
				e.preventDefault();
				var $self = $(this);
				$self.parents(".current-filter").addClass("plus").parents(".filter-container").removeClass("filtered");
				getFilters();
                var jsonObj = {"path" : location.pathname, "filter" : $("#dynamicForm").serialize() , "keyword" : ""};
				createFiltersCookie( jsonObj );
				$ajax();
			});
			//Handle submit action of search field
			var complete = true,
				query = "",
				lastRequest;
			$("#contentListSearch").submit(function(e){
				e.preventDefault();
				//$("#finishedLoading").hide("fast");
				//getFilters();
				if ( !complete || $(".resource-search").val() === query) {
					return false;
				} else {
					getFilters();
					var jsonObj = {"path" : location.pathname, "filter" : $("#dynamicForm").serialize() , "keyword" : $(".resource-search").val()};
					createFiltersCookie(jsonObj);
					$ajax();
					complete = false;
					query = $(".resource-search").val();                    
				}
			});
            
			function $ajax() {
				if (lastRequest) {
					lastRequest.abort();
					lastRequest = null;
				}
				//
				console.log("$ajaxUrl is ", $ajaxUrl);
				//
				lastRequest = $.ajax({
					beforeSend: function() {
						$(".infinite-scroll-container .infinite-scroll-item").remove();
						$("#nextPage").attr("href", "");
						$(".has-sub.open, .sub-menu.open").removeClass("open");
						//$("#loadingCue").show();                        
						$(".infinite-scroll-container").append(loadCue);
						$(".request-overlay").show();
					},
					url: $ajaxUrl,
					type: "GET",
					//async: false,
					dataType: "json",
					data: $("#dynamicForm").serialize()
				})
				.done(function( data ){		
					//console.log(data.href);						
                    jsonTemplate( data, function() {
						_t.infinitescroll().loadItems();
					});
					$("#dynamicForm input").remove();
					$(".request-overlay").hide();
                    // AEM Analytics - log all data
                    console.log("AEMa logs");
                    var searchVal = $(".resource-search").val();
                    console.log("AEMa ~ search term : " + searchVal);
                    console.log("AEMa ~ filters applied : " + filterNumArray);
                    // AEM Analytics - return filter titles                        
                        $('.article-resources .filter-wrap .filter-container.filtered').each(function(){
                            var currentVal = $(this).find('dt.current-filter a').text();                            
                            valArray.push(currentVal);
                        });
                        if (valArray.length === 0){
                            //console.log("no filters");
                            return;
                        } else {
                            console.log("AEMa ~ titles of filters selected : " + valArray);
                        }
                    console.log("AEMa ~ number of results : " + resultNum);
                    // clear arrays after log
                    filterNumArray = [];
                    valArray = [];
                    //
				})
				.fail(function(){
					console.log("Request Data Error");
				})
				.always(function(){
					complete = true;
					lastRequest = null;
				});
			}
			//get current filters on page and search values
			function getFilters() {				
                $(".filtered").each(function(){
					var $filters = $(this).data("filtered");
					//if filter has an href, create an input element and add to hidden form
					if( $filters ) {		
						$("<input name='filters' type='hidden' value='" + $filters + "'>").appendTo("#dynamicForm");
                        // AEM Analytics - filters applied
                        filterNumArray.push($filters);
                        //
					}                    
				});
				$("<input name='keyword' type='hidden' value='" + $(".resource-search").val() + "'>").appendTo("#dynamicForm");
			}
			//Consume JSON response and repaint filter section
			function jsonTemplate( data, callback ) {
				//remove items that change in filter section for repainting
				$("#clearAll, #mainFilter .filter-container, .top-layer").remove();
				var items = [];
				//Add sort filter if available in JSON
				if(!jQuery.isEmptyObject(data.sort)) {
						$('<div class="filter-wrap top-layer">' +
					        '<p class="label">' + data.sort.rootName + '</p>' +
					        '<dl class="filter-container" id="sort">' +
					            '<dt class="current-filter has-sub">' +
					            	'<a href="#">' + data.sort.sortedBy + '</a>' +
					            '</dt>' +
					            '<dd class="sub-menu">' + 
					            '</dd>' +
					        '</dl>' +
					   // '</div>').insertBefore("#mainFilter");
						'</div>').insertAfter(".sort-mobile-face");	
						$.each(data.sort.tags, function( key, val ) {
								items.push("<li><a href='" + key + "'>" + val + "</a></li>");
							});
						$("<ul/>", {
							"class": "filter-categories",
							html: items.join( "" )
						}).appendTo("#sort .sub-menu");
						items = [];
					//}
				}
				//Add all available filters in JSON
				if(!jQuery.isEmptyObject(data.filters)){
					$('#mainFilter p').show();
					$.each(data.filters, function( key, val ) {
						var filterId = "filter" + key;
						if (data.filters[key].filtered === true) {
							var tagname;
							var filterpath;
							$.each(data.filters[key].tags, function( key, val ) {
								tagname = val;
								filterpath = key;
							});
							$("#mainFilter #filters").append('<dl class="filter-container filtered" data-filtered="' + filterpath + '" id="' + filterId + '">' +
									'<dt class="current-filter">' +
									    '<a href="#">' + tagname + '</a>' +
									'</dt>' +
								'</dl>');
						} else {
							$("#mainFilter #filters").append('<dl class="filter-container" data-filter-cat="' + val.rootPath + '" id="' + filterId + '">' +
								'<dt class="current-filter has-sub plus">' +
								    '<a href="#">' + val.rootName + '</a>' +
								'</dt>' +
								'<dd class="sub-menu">' +
								'</dd>' +
							'</dl>');
						
							$.each(data.filters[key].tags, function( key, val ) {
								items.push("<li id='" + val.replace(/\s+/g, '') + "'><a href='" + key + "'>" + val + "</a></li>");
							});
							$("<ul/>", {
								"class": "filter-categories overlay",
								html: items.join( "" )
							}).appendTo("#" + filterId + " .sub-menu");
						}
						items = [];                        
					});
				} else { 
					$('#mainFilter p').hide();
				}
				//Add Clear All button if available in JSON
				if(!jQuery.isEmptyObject(data.clearAll)) {
					$('<a id="clearAll">' + data.clearAll + 
					//'</a>').prependTo('#filters');
					'</a>').insertAfter('#mainFilter .label');
				}
				//Add total asset count found
				$(".item-count span").text(data.total);
                
                // AEM Analytics - Number of results
                resultNum = data.total;
                //
				
                //
				if (data.href) {
					$("#nextPage").attr("href", data.href);
					callback();					
				} else { 
					$("#nextPage").attr("href", ""); 
				}
				//
				if (data.noResults) {
					$("<div class='infinite-scroll-item no-results'>" + 
							"<p>" +
								data.noResults +
							"</p>" +
					  "</div>").appendTo(".infinite-scroll-container");
				}
			}	
			});
		};
})(jQuery);