define([
    'modules/jquery-mozu'
], function($) {

	$(document).on('click', ".mz-pageheader.affix .mz-searchbox-button-top", function (){
		$("#searchbox").show();			
	});
	$(document).mouseup(function(e) 
	{
		var container = $("#searchbox");

		if (!container.is(e.target) && container.has(e.target).length === 0 && ($(window).width() < 495)) 
		{
			container.hide();
		}
	});
	$(window).on('resize', function() {
		if($(window).width() > 495){
			$("#searchbox").show();
		}
	});

});