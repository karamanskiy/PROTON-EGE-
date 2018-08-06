"use strict";

$(function(){


	var handler = function() {
		

	}; // end handler

	$(window).bind('load', handler);
	$(window).bind('resize', handler);


	$(document).ready(function(){


		//отмена перетаскивания картинок
		$("img, a").on("dragstart", function(e) { e.preventDefault(); });

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

			if($(this).find('input[name=data_obrab]').is(':checked') == false) {
				alert('Пожалуйста, для отправки формы согласитесь на обработку персональных данных.');
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
	$('.header__callback-btn').click(function(e) {e.preventDefault();$('#callback-modal').arcticmodal();});

	//инициализация слайдеров
	// $('.main-slider').slick({
	// 	dots: true,
	// 	speed: 500,
	// 	fade: true,
	// 	autoplay: true,
	// 	autoplaySpeed: 5000,
	// 	dotsClass: 'main-slider-dots'
	// });


	// SCROLL TOP BTN
	$('.scroll-top').click(function() {
		$('html, body').animate({
			scrollTop: $('body').offset().top
		}, 1000);
		return false;
	});

	if($('.scroll-top').length){
		$(window).scroll(function() {
			var scr_top = $(window).scrollTop();
			if (scr_top > 900) {
				$('.scroll-top').addClass('active');
			} else{
				$('.scroll-top').removeClass('active');
			}
		});
	}


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