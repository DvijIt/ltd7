document.addEventListener('DOMContentLoaded', function () {
  
  var swiper1 = new Swiper('.top-slider', {
    slidesPerView: 6,
    centeredSlides: true,
    spaceBetween: 30,
    slideToClickedSlide: true,
    simulateTouch: false,
    on: {
      init: function() {
        this.slideTo(4, 300);
      }
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 6,
      }
    }
  });

  var swiper2 = new Swiper('.bot-slider', {
    slidesPerView: 1,
    autoHeight: true,
    simulateTouch: true,
    navigation: {
      prevEl: '.slider-controls__prev',
      nextEl: '.slider-controls__next'
    },
    on: {
      init: function() {
        this.slideTo(4, 300);
      },
      slideChange: function() {
        const index = this.activeIndex
        swiper1.slideTo(index, 300);
      }
    }
  });

  // 
  const btn_burger = document.querySelector('#burger')
  const navigation_menu = document.querySelector('#navigation_menu')

  btn_burger.addEventListener('click', function () {
    navigation_menu.classList.toggle('open')
  })

  const btn_registration = document.querySelector('#btn_registration')
  const header_top = document.querySelector('#header-top')

  btn_registration.addEventListener('click', function () {
    header_top.classList.toggle('open')
  })
})