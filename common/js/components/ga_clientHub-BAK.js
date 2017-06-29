(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

if(CQ.WCM && (CQ.WCM.isEditMode(true) || CQ.WCM.isDesignMode(true))){
} else {
ga('create', 'UA-60574176-6', 'auto');
ga('create', 'UA-60574176-13', 'auto', 'clientHub');
}
ga('send', 'pageview');

// GA Event Tracking
$('.main-nav-wrapper li ul li:first-of-type a').on('click', function() {
ga('send', 'event', {
		eventCategory: 'Insights',
		eventAction: 'Main Nav Usage',
		eventLabel: 'Clicked'
	});
});

(function(){
	document.addEventListener("DOMContentLoaded", function(){
		var premDwnlds = document.querySelectorAll("#premiumContent a");
		for (var i = 0; i < premDwnlds.length; i++) {
			premDwnlds[i].addEventListener('click', function(event){
				ga('send', 'event', {
						eventCategory: 'PDF Download',
						eventAction: 'click',
						eventLabel: event.target.href
					});
				});
			}
		});
})();

// START :: Client Hub Tracking - GA Code Snippet and Custom Application Tracking Code

;(function(){
	document.addEventListener("DOMContentLoaded", function(){
		function gaClickTrack(stringSelector) {
			var aGa = document.querySelectorAll(stringSelector);
			var emailHash = CQ_Analytics.ProfileDataMgr.getProperty('loginhashid');

			for (var i = 0; i < aGa.length; i++) {
				var parentVal,
					thisValue,
					childVal,
					outVal;

				aGa[i].addEventListener('click', function(event){					
					// create hasClass function
					function hasClass( elem, classVal ) {
					     return (" " + elem.className + " " ).indexOf( " " + classVal + " " ) > -1;
					};
					// ga send function
					function sendGa(val1, val2) {
						// send tracking values
						ga('clientHub.send', 'event', {						
							eventCategory: val1,
							eventAction: 'click',
							eventLabel: val2
						});
						ga('clientHub.set', {							
							dimension1: emailHash
						});
					};
					// get value of clicked elem
					thisValue = this.innerText;
					// if link is dropdown
					if (hasClass(this, 'has-sub') == true) {						
						// set parentVal
						parentVal = this.innerText;
						parentVal = parentVal.substring(0, parentVal.length - 1);
					// if link is not dropdown
					} else if (!hasClass(this, 'has-sub') == true && this.parentNode.nodeName != 'LI') {
						thisValue = thisValue.substring(0, thisValue.length - 1);
						sendGa(thisValue, thisValue);
					}
					// if link is within dropdown ul
					if (this.parentNode.nodeName == 'LI') {
						childVal = this.innerText;
						sendGa(parentVal, childVal);
					}
				});
			}	
		};
		var url = window.location.href;
		var lastHash = url.substr(url.lastIndexOf('/') + 1);
		if (lastHash === "clientportal.html") {
			ga('clientHub.send', 'pageview');
			gaClickTrack(".my-apps a");
		}
	});
})();
// END :: Client Hub Tracking - GA Code Snippet and Custom Application Tracking Code