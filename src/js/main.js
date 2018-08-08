"use strict";

$(function(){


	var handler = function() {
		

	}; // end handler

	$(window).bind('load', handler);
	$(window).bind('resize', handler);


	$(document).ready(function(){


		//отмена перетаскивания картинок
		$("img, a").on("dragstart", function(e) { e.preventDefault(); });

		var rellax = new Rellax('.parallax');

		$('.style_select').styler();

		//navigation scroll to
		$(".menu").on("click","a.scroll", function (e) {
			e.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top;
			$('body,html').animate({scrollTop: top}, 1000);
		});


		//AJAX email send
		$('form').submit(function(event) {
			event.preventDefault();

			var id = $(this).attr('id');
			var data = $(this).serialize();

			if($(this).find('input[type="tel"]').val().length < 12 || $(this).find('input[name="name"]').val().length < 4) {
				$('#error-modal').arcticmodal();
				return;
			}

			$.ajax({
				url				: '/emailOrder.php',
				data			: data,
				type			: 'post',
				success		: function(){
					$.arcticmodal('close');
					$('.contacts__form input').val('');
					$('#success-modal').arcticmodal();
				},
				error			: function(){
					alert('Ошибка отправки формы :(');
				}
			});
		});



	// вызов всплывающего окна
	$('.sect1__btn-vopros').click(function(e) {e.preventDefault();$('#callback-modal').arcticmodal();});
	$('.soglashenie').click(function(e) {e.preventDefault();$('#soglashenie-modal').arcticmodal();});



	// скрытие placeholder
	$('input').on('focus', function () {
		var $this = $(this);
		var placehold = $this.attr('placeholder');
		$this.attr('data-placeholder', placehold);
		$this.attr('placeholder', '');
		// $this.data($this, 'placeholder', placehold);
	});
	$('input').on('blur', function () {
		var $this = $(this);
		$this.attr('placeholder', $this.data('placeholder'));
	});



	// masked input
	var $phoneInput = $('input[type="tel"]');
	$phoneInput.mask("+7 (999) 999-99-99");
	$phoneInput.focus(function() {
		if ( $(this).val() == '' ) { $(this).val('+7 ('); }
	});









	//исправление бага ArcticModal в Firefox
	$('.arcticmodal-close').click(function() {
		$('body').css({'overflow-y': 'scroll'});
	});
	$("body").click(function(){$(this).css('overflow-y','visible')});

	// if($('#main-map').length) {initMap();}


//==========EoF==============
});
});