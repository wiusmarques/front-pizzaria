
$('document').ready(function () {
	const $win = $(window);
	const $body = $('body');
	const $headerMenu = $('.content-header');
	const $menuBurguer = $('.content-header-menu-hamburguer');
	const $menuItem = $('.content-menu-mobile');


	const isScrolled = function () {
		return $win.scrollTop() > 30;
	};
	const isDesktop = function () {
		return $win.outerWidth() >= 992;
	};

	const swiperBanner = new Swiper('.swiper-banner', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		speed: 1000,
		direction: 'horizontal',
		watchOverflow: true,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		autoplay: {
			delay: 5000,
		},
		clickable: true,
		pagination: {
			el: '.swiper-pagination-banner',
			clickable: true
		},
		navigation: {
			nextEl: '.swiper-button-next-banner',
			prevEl: '.swiper-button-prev-banner',
		},
	});
	const swiperProducts = new Swiper('.swiper-products', {
		slidesPerView: 4,
		slidesPerGroup: 1,
		spaceBetween: 30,
		speed: 1000,
		direction: 'horizontal',
		watchOverflow: true,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		autoplay: {
			delay: 5000,
		},
		breakpoints: {
			991: {
				slidesPerView: 2,
				slidesPerGroup: 1,
				spaceBetween: 15,
			},
			576: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 15,
			}
		},
		clickable: true,
		pagination: {
			el: '.swiper-pagination-products',
			clickable: true
		},
		navigation: {
			nextEl: '.swiper-button-next-products',
			prevEl: '.swiper-button-prev-products',
		},
	});
	const swiperDepoiments = new Swiper('.swiper-depoiments', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 30,
		speed: 1000,
		direction: 'horizontal',
		watchOverflow: true,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		autoplay: {
			delay: 5000,
		},
		clickable: true,
		navigation: {
			nextEl: '.swiper-button-next-depoiments',
			prevEl: '.swiper-button-prev-depoiments',
		},
	});
	$win.scroll(function () {
		if (isScrolled()) {
			$headerMenu.addClass('content-header-scrolled');
		}
		else {
			$headerMenu.removeClass('content-header-scrolled');
		}
	});

	$menuBurguer.click(function () {
		$menuBurguer.children('.content-header-menu-hamburguer-item').toggleClass('content-header-menu-hamburguer-item-active');
		$menuItem.toggleClass('content-menu-mobile-active');
		if ($menuBurguer.children('.content-header-menu-hamburguer-item').hasClass('content-header-menu-hamburguer-item-active')) {
			$menuBurguer.children('p').text('Fechar');
		}
		else {
			$menuBurguer.children('p').text('Menu');
		}
	});

	AOS.init({
		offset: 0,
		delay: 0,
		duration: 950,
		easing: 'ease-in-sine',
	});
});