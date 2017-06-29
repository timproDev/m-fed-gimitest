/*
*
* Main Nav Touch State and Drop Menu
* 
* 
*/

/*$navLink = $(".slide-down-panel .list-nav li");

$navLink.click(function(e) {
	//e.preventDefault();
	var $self = $(this);
	if($(".slide-down-panel .list-nav li.active").length === 0){
		$self.addClass("active");		
		//$(".region-wrap[data-region='" + dataAttr + "'] " + ".region-selector-list").slideDown();		
	} else if ($self.hasClass("active")) {
		//$wrapState.slideToggle();
		$self.removeClass("active");
	} else {
		$(".slide-down-panel .list-nav li.active").removeClass("active");
		$self.addClass("active");
		/*$wrapState.slideUp(function() {
			$().slideDown();
			console.log();
		});*/
/*	}
});
*/

//Toggle class for slide down when clicking the hamburger menu
$(".nav-icon-link").click(function(e){
	e.preventDefault();
	$(this).toggleClass("active");
	$(".slide-down-panel,.main-nav-container nav").toggleClass("open");
});
$(".has-sub").click(function(e){
//$(document).on("click", ".has-sub", function(e){
	e.preventDefault();
	var $openSubs = $(".has-sub.open, .sub-menu.open");
	var $self = $(this);
	if($(window).width() <= 1024 && $self.hasClass("tablet")) {	
		//console.log("tablet here");
		dropClickHandler($openSubs, $self);
	} else {
		//console.log("all-breaks here");
		dropClickHandler($openSubs, $self);
	}
	//reset masonry to resize height of body when clicking on a dropdown menu in the right rail
	if(window.innerWidth <= 1024 && window.innerWidth >= 641 && $self.closest("aside.realign")) {
		//var $aside = $('aside.realign');
		$('aside.realign').masonry();
	}
});

function dropClickHandler($openSubs, $self) {
	if($openSubs.length === 0){
		$self.addClass("open").next(".sub-menu").addClass("open");		
	} else if ($self.hasClass("open")) {
		$self.removeClass("open").next(".sub-menu").removeClass("open");
	} else {
		$openSubs.removeClass("open");
		$self.addClass("open").next(".sub-menu").addClass("open");	
	}
	$(".has-sub.open, .sub-menu.open").click(function(e){
		e.stopPropagation();
	});
	$(".sub-menu a").click(function(e){
		$(".has-sub.open, .sub-menu.open").removeClass("open");
	});
}