//code commented to remove usercookie
/*function getUserData(url) {
	$.ajax({
		type : 'GET',
		url : url,
		success : function(data) {
			var userData = data;
			if(userData != undefined && userData != "" && userData.userName != undefined && userData.userName != "") {
				createCookie("userCookie", JSON.stringify(userData),"",true);				
			} 
			updateComponents();
		},
		error: function (xhr, ajaxOptions, thrownError) {
			updateComponents();
		}
	});	
}*/

var clientContextJson;
function getUserData() {
    if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
		CQ_Analytics.ProfileDataMgr.reset();
		clientContextJson = JSON.stringify(CQ_Analytics.ProfileDataMgr.getData(["avatar","path"]));
	}
    updateComponents();
}

function submitLoginModal(url) {
	//var rightRailClasses = $(form).parent().parent().parent().parent().attr("class");
	//if(form != undefined && rightRailClasses != undefined && rightRailClasses.indexOf('right-rail-login') > -1) {
		createCookie('saml_request_path', url, 1,true);
	//}
}

function updateComponents() {
	updateHeader();
	if(typeof(updateRightRailLogin) == "function") {
		updateRightRailLogin();
	}
	updateArticle();
	updateCHBanner();
	updateBreadcrumbs();
	updateForms();
	updateUser();
}

//code commented to remove usercookie
/*function isLoggedIn() {
	var userCookie = JSON.parse(readCookie("userCookie"));
	if( userCookie == undefined || userCookie == null || userCookie == "") {
		return false;
	} else {
		return true;
	}
}*/

function updateUser(){
	if(isLoggedIn()) {
		var user = JSON.parse(clientContextJson);
        var url = window.location.href;
        url = url.replace("html", "updateloginhashid.html");
        var userId = user["authorizableId"];
		if (user["loginhashid"] == undefined || user["loginhashid"] == ""){
			$.ajax({
				type : 'POST',
				url : url,
				data: {"id":userId},
				success : function(data) {
					var userData = data;
				},
				error: function (xhr, ajaxOptions, thrownError) {
					console.log("Error updating user data");
				}
			});
		}
	}
}

function isLoggedIn() {
    if (clientContextJson != undefined && clientContextJson != null && clientContextJson.length > 0) {
        var clientContextString = JSON.parse(clientContextJson);
        if( clientContextString == undefined || clientContextString == null || CQ_Analytics.ClientContext.get('profile/authorizableId') == 'anonymous') {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function updateHeader() {
	if(isLoggedIn()) {
		var str = $("#user-welcome").text();
		str = str.replace("##name##", getUserName());
		$("#user-welcome").text(str);
		$("#loggedIn").removeClass('hide');
	} else {
		$("#loggedOutText").removeClass('hide');
	}
}

function updateArticle() {
	if(!isLoggedIn()) {
		$("#articleLoggedOutText").removeClass('hide');
	} else {
		$("#articleLoggedInText").removeClass('hide');
	}
}

function updateCHBanner() {
	if(isLoggedIn()) {
		$("#welcome_user h1").append(" " + getUserName());
		//$("#companyname").text(getCompany());
		var href = $("#emailID").attr('href');
		if(href!=undefined){	
			if (href.indexOf("?") !== -1) {	
				$("#emailID").attr('href',href + "&"+ "emailID="+getEmail());
			}else {
				$("#emailID").attr('href',href + "?"+ "emailID="+getEmail());
			}
		}
	}
}

function updateBreadcrumbs() {
	if(!isLoggedIn()) {				
		$("#home").removeClass('hide');
	} else {
		$("#clientHubHome").removeClass('hide');
	}
}

//The updateForms() method will use to autopopulate the editprofile Form values.
//This method will read clientcontext object and parse it and then iterate over all properties within it. 
//For each property it will do a search within the page for an input or select that corresponds to the property.
//If an input or select is found, the value of that input/select will be set to whatever the value is in the cookie.
/*function updateForms(){
	if(isLoggedIn()) {
		var user = JSON.parse(readCookie("userCookie"));
		for (var key in user) {
			$("#"+key).val(user[key]);
			$('#'+key+' option[value="'+user[key]+'"]').attr('selected', true);
			$("#"+key).trigger("change");
		}
		if(user["country"] == "Canada" && user["region"] != undefined && user["region"] != "") {
			$("#canadaRegion").val(user["region"]);
			$('#canadaRegion' +' option[value="'+user["region"]+'"]').attr('selected', true);
			$("#canadaRegion").trigger("change");
		}
	}
}*/
function updateForms(){
	if(isLoggedIn()) {
		var user = JSON.parse(clientContextJson);
        var flag = 0;
		for (var key in user) {
        	if (!endsWithXss(key,'_xss') && key != 'authorizableId' && key != 'isLoggedIn' && key != 'region') {
                if (flag == 0) {
                    //prototype call to make the region of USA and Canada as mandatory dropdown and others as non-mandatory input-box
                    $("#country").formswitcheditprofile();
                    flag++;
                }
                if (key == "country" && user["region"] != undefined) {
					//$("#"+key).val(unescapeValues(user[key]));
                    if ((user["country"] == "USA" || user["country"] == "United States") && ($('#'+key+' option[value="'+unescapeValues(user[key])+'"]').length < 1)) {
                    	if (user["country"] == "USA") {
                        	$('#'+key+' option[value="United States"]').attr('selected', true);
                        } else {
                        	$('#'+key+' option[value="USA"]').attr('selected', true);
                        }
                    } else {
	                	$('#'+key+' option[value="'+unescapeValues(user[key])+'"]').attr('selected', true);
                    }
                	$("#"+key).trigger("change");

                    if(user["country"] == "USA" || user["country"] == "United States") {
                        $("#region").val(unescapeValues(user["region"]));
                        $('#region' +' option[value="'+unescapeValues(user["region"])+'"]').attr('selected', true);
                        $("#region").trigger("change");
                    } else if(user["country"] == "Canada") {
                        $("#canadaRegion").val(unescapeValues(user["region"]));
                        $('#canadaRegion' +' option[value="'+unescapeValues(user["region"])+'"]').attr('selected', true);
                        $("#canadaRegion").trigger("change");
                    } else {
                        $("#region").val(unescapeValues(user["region"]));
                    }
                } else {
                    $("#"+key).val(unescapeValues(user[key]));
                	$('#'+key+' option[value="'+unescapeValues(user[key])+'"]').attr('selected', true);
                	$("#"+key).trigger("change");
                }
            }
		}
	}
}

function endsWithXss(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

//To unescape special characters which is returned in clientcontext data
function unescapeValues(value) {
    if (value != null && value.length > 0) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = value;
        return textArea.value;
    }
    return "";
}

function getUserName() {
	if(!isLoggedIn()) {
		return "";
	} else {
		//code commented to remove usercookie
		//var userCookie = JSON.parse(readCookie("userCookie"));
		//return userCookie.userName;
		var clientContextString = JSON.parse(clientContextJson);
		return unescapeValues(clientContextString.formattedName);
	}
}

/*function getCompany() {
	if(!isLoggedIn()) {
		return "";
	} else {
		//code commented to remove usercookie
		//var userCookie = JSON.parse(readCookie("userCookie"));
		//return userCookie.company;
		var clientContextString = JSON.parse(clientContextJson);
		return unescapeValues(clientContextString.companyname);
	}
}*/

function getEmail() {
	if(!isLoggedIn()) {
		return "";
	} else {
		//code commented to remove usercookie
		//var userCookie = JSON.parse(readCookie("userCookie"));
		//return userCookie.email;
		var clientContextString = JSON.parse(clientContextJson);
		return unescapeValues(clientContextString.email);
	}
}

function createCookie(name,value,days,isSecure) {
	isSecure = (typeof isSecure === 'undefined') ? false : isSecure;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	if (isSecure){
        if (name == 'saml_request_path') {
            document.cookie = name+"="+value+expires+"; path=/;secure";
        } else {
            document.cookie = name+"="+encodeURIComponent(value)+expires+"; path=/;secure";
        }
	} else {
		document.cookie = name+"="+encodeURIComponent(value)+expires+"; path=/";
	}
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

//code added to make the region of USA and Canada as mandatory dropdown and others as non-mandatory input-box
;(function( $ ) {
	$.fn.formswitcheditprofile = function( options ) {
		var _t = this;
		return _t.each(function(){
			var selectTag 	= $("#region").clone();
			$canRegion 	= $("#canadaRegion");
			var canSelect = $canRegion.clone();
			$canRegion.remove();
			_t.change(function(){
				var options 	= document.getElementById("country").options;
                if (options.selectedIndex > -1) {
					var optionId	= options[options.selectedIndex].id,
                        $region 	= $("#region, #canadaRegion"),
                        $regionName = $region.attr("name"),
                        inputTag 	= $("<input>", {type: "text",id: "region",name: $regionName,value: ""});

                    if (optionId === "united-states-of-america") {		
                        $region.replaceWith(selectTag);
                        $("#regions label span").show();
                    } else if (optionId === "canada") {
                        $region.replaceWith(canSelect);
                        $("#canadaRegion,#regions label span").show();
                    } else {
                        $region.replaceWith(inputTag);
                        $("#regions label span").hide();
                        $("#region").valid();
                    }
                    if ($("#regions label.error-flag").length || $("#regions select.error-flag").length) {
                        $("#regions label.error-flag").remove();
                        $("#regions select.error-flag").removeClass();	
                    }
                }
			});
			_t.change();
		});
	};
})(jQuery);