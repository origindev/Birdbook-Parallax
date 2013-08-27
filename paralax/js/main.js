
jQuery(document).ready(function($){
	
	"use strict";
	
	// jQuery tooltips
	$('#header .social li a').tooltip({placement: 'bottom'});
	
	// Preview items carousel with Flexslider
	$('.previews .flexslider').flexslider({
		directionNav: false,
		animationLoop: false,
		slideshow: false,
		animation: 'slide',
		start: function(slider) { $(slider).removeClass('loading'); }
	});
	
	// Preview items figure hover effect
	$('.previews .item').hover(
		function() { $(this).find('figure.figure-hover').children('div').fadeIn(200); },
		function() { $(this).find('figure.figure-hover').children('div').fadeOut(200); }
	);
	
	// Preview images popup gallery with Swipebox
	$('.previews .swipebox').swipebox();
	
	// jQuery placeholder for IE
	$("input, textarea").placeholder();
	
	
	/* Email subcribe process */
	$('#dotstheme-subscribe-form input[type="text"]').live('focus keypress',function(){ // Checking subcribe form when focus event
		var $email = $(this);
		if ($email.val() === 'Please enter your email address' || $email.val() === 'Please enter a valid email address' || $email.val() === 'Subscribe process completed' || $email.val() === 'Email is already registered') {
			$(this).val('').css({'backgroundColor': '#FFF'});
		}
	});
	
	$('#dotstheme-subscribe-form').submit(function(){ // Checking subcribe form when submit to database
		var $email	= $(this).find('input[type="text"]');
		var $submit	= $(this).find('input[type="submit"]');
		var email_pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
		if (email_pattern.test($email.val()) === false) {
			$email.val('Please enter a valid email address').css({'backgroundColor': '#f0c0c0'});
		} else {
			var submitData = $(this).serialize();
			$email.attr('disabled','disabled');
			$submit.attr('disabled','disabled');
			$.ajax({ // Subcribe process with AJAX
				type: 'POST',
				url: 'subscribe-process.php',
				data: submitData + '&action=add',
				dataType: 'html',
				success: function(msg){
					if (parseInt(msg, 0) !== 0) {
						var msg_splits = msg.split('|');
						
						if (msg_splits[0] === 'success') {
							$submit.removeAttr('disabled');
							$email.removeAttr('disabled').val(msg_splits[1]).css({'backgroundColor': '#baeaba'}); 
						} else {
							$submit.removeAttr('disabled');
							$email.removeAttr('disabled').val(msg_splits[1]).css({'backgroundColor': '#f0c0c0'});
						}
					}
				}
			});
		}
		return false;
	});
	/* End email subcribe process */
	
	
	/* Back to top scroll */
	$(window).scroll(function(){
		var $scrollup = $('.scrollup');
		if ($(this).scrollTop() > 100) { $scrollup.css('opacity', 1); }
		else { $scrollup.css('opacity', 0); }
	}); 
	
	$('.scrollup').click(function(){
		$("html, body").stop().animate({ scrollTop: 0 }, 2000, 'easeInOutExpo');
		return false;
	});
	/* End Back to top scroll */

});
