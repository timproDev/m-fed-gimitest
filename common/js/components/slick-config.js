/*
*
* Slick Slider/Carousel initializer and other configurations
*
*/
$(document).ready(function(e) {
	$('.feature-carousel .carousel-panel').slick(
	{
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
		/*{
			breakpoint: 1024,
			settings: {
				//slidesToShow: 3,
				//slidesToScroll: 3,
				//infinite: true,
				//arrows: true
			}
		},*/
		{
			breakpoint: 1025,
			settings: {
				arrows: false,
				dots: true
			}
		},
		{
			breakpoint: 693,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: true
			}
		}
		]
	});
	
	$('.promo-slider .slider').each(function(idx, item){
		var carouselId = "sliderId-" + idx;
		this.id = carouselId;
		$(this).slick({
			slide: "#" + carouselId + " .slide",
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<span class="slide-prev">' + $("#" + carouselId + " .prevCtrl").val() + '</span>',
			nextArrow: '<span class="slide-next">' + $("#" + carouselId + " .nextCtrl").val() + '</span>',		
			appendArrows: "#" + carouselId + " .slider-control"
		});
	});
	/*$('.rt-rail-promo-slider .carousel-panel').each(function(idx, item) {
		var carouselId = "rtSliderId-" + idx;
		this.id = carouselId;
		$(this).slick({
			slide: "#" + carouselId + " .slide",
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<span class="slide-prev">' + $("#" + carouselId + " .prevCtrl").val() + '</span>',
			nextArrow: '<span class="slide-next">' + $("#" + carouselId + " .nextCtrl").val() + '</span>',		
			appendArrows: "#" + carouselId + " .slider-control"	
		});
	});*/
	
	//$('.promo-slider')
//		.each(function(index){
//			var $self = $(this);
//			sliderId = 'promo-slider-' + index;
//			var controlId = 'controller-' + index;
//			$self.attr('id', sliderId);
//			$self.parent('.promo-slider-container').find('.controller').attr('id', controlId);
//			//$self.next('.controller').attr('id', controlId);
//			$self.slick({
//		  		infinite: true,
//		  		slidesToShow: 1,
//		  		slidesToScroll: 1,
//				appendArrows: controlId,
//				prevArrow: $('#' + controlId +  ' .slicker-prev'),
//				nextArrow: $('#' + controlId +  ' .slicker-next')	
//			});
//	});
	
	$('.full-width-carousel .slider').slick({
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  responsive: [
		/*{
			breakpoint: 1024,
			settings: {
				//slidesToShow: 3,
				//slidesToScroll: 3,
				//infinite: true,
				//arrows: true
			}
		},*/
		{
			breakpoint: 1025,
			settings: {
				arrows: false,
				dots: true
			}
		},
		{
			breakpoint: 693,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: true
			}
		}
		]
	});
    $('.homepage-feature-area .slider').slick({
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
      dots:true,
      arrows: false
	  //responsive: [
            /*{
                breakpoint: 1024,
                settings: {
                    //slidesToShow: 3,
                    //slidesToScroll: 3,
                    //infinite: true,
                    //arrows: true
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 693,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }*/
		//]
	});
	$('.text-slider').slick({
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  responsive: [  
	   {
		breakpoint: 1025,
			settings: {
				arrows: false,
				dots: true
			}
		}
	  ]
		
	});
	
});