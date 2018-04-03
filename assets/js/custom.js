function scrollNav() {
  $('.nav a').click(function(){  
    $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top - 50
    }, 400);
    return false;
  });
  $('.scrollTop a').scrollTop();
}
scrollNav();

function displayContact() {
	$('#contact-link').click(function() {
		var contactInfo = $('#contact-info');
		if ( contactInfo.css('display') === 'none' ) {
			contactInfo.show();
		} else {
			contactInfo.hide();
		}
	});
}
displayContact();