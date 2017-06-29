;(function($){

  var wrap = $("body");

wrap.on("scroll", function(e) {
  if (this.scrollTop > 147) {
    wrap.addClass(".rf-fix"); 
  } else {
    wrap.removeClass(".rf-fix");
  }
});

console.log("sdc");

})(jQuery);