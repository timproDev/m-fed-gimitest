/*
*
* Filters (Resources, Blogs, Search)
* 
* 
*/
/*
$(".filter-categories a").click(function(){
	//console.log("you clicked a data filter");
	var $self = $(this)
	var filter = $self.attr("data-filter");
	var filterText = $self.text();
	console.log(filterText);
	//var currrentFilter = $self.parents(".filter-container").children(".current-filter a").attr("data-" + /.*//*i);
	//$self.parents(".filter-container").children(".current-filter a").attr(currentFilter, filter);
	$self.parents(".filter-container").find(".current-filter a").text(filterText);
	$(".has-sub, .sub-menu").removeClass("open");
	//$.get("test.php", function(data){alert("getting, getting, getting!" + data)});
});*/
//TODO:This could be moved to the resource center code 
//Click handler for grid and list views
$(".filter-wrap button").click(function(){
	var $self = $(this),
	$activeState = $(".filter-wrap button.active");	
	if(!$self.hasClass("active")) {
		$activeState.removeClass("active");
		$self.addClass("active");
		$(".resources-container").removeClass("grid list").addClass($self.attr("id"));		
	}
	//test();
	//function test( ){
	//$(".article-resources .article-copy").trigger("update.dot");
	//console.log("updating dotdotdot");
	//}
});