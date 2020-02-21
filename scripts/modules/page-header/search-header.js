define([
    'modules/jquery-mozu'
], function($) {

    $(".mz-searchbox-button-top").click( function (){
		$("#searchbox").toggle();
	});
	$(window).on('resize', function() {
		if($(window).width() > 495){
			$("#searchbox").css("display", "block");
		}
	});

});