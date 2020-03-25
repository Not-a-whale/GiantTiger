define([
    'modules/jquery-mozu',
    "swiper"
], function($, Swiper) {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 0,
        loop: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
        },
        preventClicks: false,
        preventClicksPropagation: false,
        breakpoints: {
            1024: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: '1'
            },
            640: {
                slidesPerView: '1'
            },
            320: {
                slidesPerView: '1'
            }
        }
    });
    function window_resize(){
    }
    $(window).resize(function() {
        window_resize();
    });


});
