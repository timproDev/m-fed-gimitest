/*
*
* Fly Out Login
* Javascript for flyout login in home page
* 
*/
//animate flyout login for the homepage
function flyoutAnimation () {
	var $flyoutLogin = $(".flyout-login");
	if ($flyoutLogin.length > 0 && $flyoutLogin.css("display") !== "none") {
		$flyoutLogin.animate({"right" : "+=250"});
		$("#hideFlyIn").click(function (e) 
		{
			console.log("just clicked");
			e.preventDefault();
			$(".flyout-login").animate({"right" : "-=250"});		
		});
	}
}
