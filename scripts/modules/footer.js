require(["modules/jquery-mozu"], function($) {

	$(".ml-footer-links-section>h4>a").click( function(){
		if ($(window).width() < 1200) {
			var ids = $(this).attr('id');

			$('.ml-footer-links-section>h4>a').removeClass('active');
			if($(".ml-footer-links-section>div#" + ids).is(':visible')){
				$(this).removeClass('active');
			}else{
				$(this).addClass('active');
			}
			$('.ml-footer-links-section>.mobileNav').not('#'+ids).slideUp();
			$(".ml-footer-links-section>div#" + ids).slideToggle();
		}
	});
	
	$("a#weeklyFlyerMobile").click( function(){
		if ($(window).width() < 768) {

			var ids = $(this).attr('id');

			$(this).toggleClass('active');	
			$(".weekly-flyer-wrapper>div#" + ids).slideToggle();	
			console.log(ids);
		}
	});

});