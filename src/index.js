import 'bootstrap';
import './libs/animate.css'
import WOW from './libs/wow.min.js'
import Swiper from './libs/swiper.min.js';
import './libs/swiper.css';
import './index.scss'

document.addEventListener('DOMContentLoaded', function () {

  new WOW().init();

  const slider = new Swiper('.calculator__slider', {
    slidesPerView: 3,
    spaceBetween: 80,
    navigation: {
      prevEl: '.calculator__slider .arrowLeft',
      nextEl: '.calculator__slider .arrowRight'
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      }
    }
  })

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


  // header

  function number_format(number, decimals, dec_point, separator) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof separator === 'undefined') ? ',' : separator,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + (Math.round(n * k) / k)
          .toFixed(prec);
      };
    // Фиксим баг в IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
      .split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
      .length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1)
        .join('0');
    }
    return s.join(dec);
  }

  let randomIndexes = JSON.parse('{"IRBT":{"price":"74.2","currency":"USD","name":"iRobot Corp"},"MSFT":{"price":"225.47","currency":"USD","name":"Microsoft Corporation"},"CHMF":{"price":"932.2","currency":"RUB","name":"\u0421\u0435\u0432\u0435\u0440\u0441\u0442\u0430\u043b\u044c"},"SNGS":{"price":"36.74","currency":"RUB","name":"\u0421\u0443\u0440\u0433\u0443\u0442\u043d\u0435\u0444\u0442\u0435\u0433\u0430\u0437"},"PALLAD":{"price":"2268.5","currency":"USD","name":"\u041f\u0430\u043b\u043b\u0430\u0434\u0438\u0439"},"FB":{"price":"294.95","currency":"USD","name":"Facebook"},"AMD":{"price":"90.74","currency":"USD","name":"AMD"},"INTC":{"price":"51.19","currency":"USD","name":"Intel Corporation"},"YNDX":{"price":"5114.8","currency":"USD","name":"\u042f\u043d\u0434\u0435\u043a\u0441"},"MMM":{"price":"162.58","currency":"USD","name":"3M Company"},"TIF":{"price":"122.46","currency":"USD","name":"Tiffany & Co"},"BSPB":{"price":"44.35","currency":"RUB","name":"\u0411\u0430\u043d\u043a \u0421\u0430\u043d\u043a\u0442-\u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433"}}');

  const header_items = [...document.querySelectorAll('.header__illustration-item')]

  setInterval(function () {

    let cut = 0;

    if (cut == 3)
      cut = 0;

    header_items.forEach((el, index) => {
      setTimeout(function () {
        el.classList.remove('animate__animated', 'animate__bounceIn')
        el.classList.add('animate__animated', 'animate__fadeOutLeft');
      }, (200 * index))

      setTimeout(function () {
        let randomData = randomIndexes[Object.keys(randomIndexes)[Math.floor(Math.random() * Math.floor(11))]];
        el.querySelector('.name').textContent = randomData["name"];

        if (randomData["currency"] == "RUB") {
          el.querySelector(".number").textContent = "₽" + number_format(randomData["price"], 2, ',', ' ');
        } else el.querySelector(".number").textContent = "$" + number_format(randomData["price"], 2, ',', ' ');

        setTimeout(function () {
          el.classList.remove('animate__animated', 'animate__fadeOutLeft');
          el.classList.add('animate__animated', 'animate__bounceIn')
        }, (200 * index));

      }, 1100)
    })


  }, 5000);

  // tabs 
  const tabs = [...document.querySelectorAll('.profitableness__list li a')]
  const tabs_info = [...document.querySelectorAll('.profitableness__info')]
  const tabs_image = [...document.querySelectorAll('.profitableness__stats')]

  tabs.forEach((el, index) => {
    el.addEventListener('click', function () {
      tabs.forEach(el => el.classList.remove('active'))
      tabs_info.forEach(el => el.classList.remove('active'))
      tabs_image.forEach(el => el.classList.remove('active'))
      el.classList.add('active')
      tabs_info[index].classList.add('active')
      tabs_image[index].classList.add('active')
    })
  })

  // calculator

  let plansData = JSON.parse(
    '{"1":{"name":"Standart","counts":1,"percent":5,"min":{"RUB":"15000.00","USD":"200.00","BTC":"0.01800000"},"max":{"RUB":"57000.00","USD":"800.00","BTC":"0.07000000"}},"2":{"name":"Profesional","counts":1,"percent":8,"min":{"RUB":"57000.00","USD":"800.00","BTC":"0.07100000"},"max":{"RUB":"144000.00","USD":"2000.00","BTC":"0.18000000"}},"3":{"name":"Gold","counts":10,"percent":12,"min":{"RUB":"144000.00","USD":"2000.00","BTC":"0.18000000"},"max":{"RUB":"980000.00","USD":"13000.00","BTC":"1.33000000"}}}'
  );

  $(".calculator__item-block[data-plan=" + 1 + "]").addClass('active')
  $("input[name='currency']").val(1)

  $(".calculator__item-block").on("click", function () {
    let value = $(this).data('plan');
    let currency = $("input[name='currency']").val();

    if (currency == 1)
      currency = "RUB";
    else if (currency == 2)
      currency = "USD";
    else
      currency = "BTC";

    $(".calculator__item-block").removeClass("active");
    $(".calculator__item-block[data-plan=" + value + "]").addClass("active");
    $("input[name='Plan']").val(value);
    $("input[name='Sum']").val(plansData[value]["min"][currency]);

    calcRange.data("ionRangeSlider").update({
      from: plansData[value]["min"][currency],
      min: plansData[value]["min"][currency],
      max: plansData[value]["max"][currency],
      step: currency === "RUB" ? 1 : currency === "USD" ? 0.5 : 0.000001
    });

    UpdatePlan();
  });

  $(".button_currenncy").on("click", function () {
    let value = $(this).data('plan');
    let currency = $("input[name='currency']").val();
    let percents = '5%'
    let time = '3 месяца'

    if (currency == 1)
      currency = "RUB";
    else if (currency == 2)
      currency = "USD";
    else
      currency = "BTC";

    if (value == 1) {
      percents = '5%';
      time = '3 месяца';
    } else if (value == 2) {
      percents = '8%';
      time = '5 месяцев'
    } else {
      percents = '12%';
      time = '6 месяцев'
    }

    $(".button_currenncy").removeClass("active");
    $(".button_currenncy[data-plan=" + value + "]").addClass("active");
    $("input[name='Plan']").val(value);
    $("input[name='Sum']").val(plansData[value]["min"][currency]);
    $("#percents").html(percents)
    $("#days").html(time)
    calcRange.data("ionRangeSlider").update({
      from: plansData[value]["min"][currency],
      min: plansData[value]["min"][currency],
      max: plansData[value]["max"][currency],
      step: currency === "RUB" ? 1 : currency === "USD" ? 0.5 : 0.000001
    });

    UpdatePlan();
  });

  let calcRange = $(".js-range-slider")
  if (document.querySelector(".js-range-slider") !== null) {
    calcRange.ionRangeSlider({
      min: 15000,
      max: 59999,
      from: 1000,
      skin: "big",
      step: 1,
      hide_from_to: "true",
      hide_min_max: "true",
      onChange: function (data) {
        let decimals = $("input[name='currency']").val() == 3 ? 8 : 2;
        $(".the_sum_of_tariffs").val(number_format(data.from, decimals, '.', ''));
        UpdatePlan();
      },
    });
  }


  $(".currency__item").on("click", function () {
    $(".currency__item").removeClass("active");
    var value = $(this).data('currency');
    $(this).addClass("active");
    $("input[name='currency']").val(value);
    let decimals = value == 3 ? 8 : 2;
    let currencyISO = "";
    let icon = "";

    if (value == 1) {
      currencyISO = "RUB";
      icon = "₽";
    } else if (value == 2) {
      currencyISO = "USD";
      icon = "$";
    } else {
      currencyISO = "BTC";
      icon = "Ƀ";
    }

    for (let i = 1; i <= 3; i++) {
      let planData = plansData[i];

      $(".calculator__item-block[data-plan=" + i + "] ul li:nth-child(3) p:nth-child(2)").html(icon + number_format(planData["min"][currencyISO], decimals, ',', ' '));
      $(".calculator__item-block[data-plan=" + i + "] ul li:nth-child(4) p:nth-child(2)").html(icon + number_format(planData["max"][currencyISO], decimals, ',', ' '));

      if ($(".calculator__item-block[data-plan=" + i + "]").hasClass("active")) {
        calcRange.data("ionRangeSlider").update({
          from: planData["min"][currencyISO],
          min: planData["min"][currencyISO],
          max: planData["max"][currencyISO],
          step: currencyISO === "RUB" ? 1 : currencyISO === "USD" ? 0.5 : 0.000001
        });

        $(".the_sum_of_tariffs").val(number_format(planData["min"][currencyISO], decimals, '.', ''));
      }
      if ($(".button_currenncy[data-plan=" + i + "]").hasClass("active")) {
        calcRange.data("ionRangeSlider").update({
          from: planData["min"][currencyISO],
          min: planData["min"][currencyISO],
          max: planData["max"][currencyISO],
          step: currencyISO === "RUB" ? 1 : currencyISO === "USD" ? 0.5 : 0.000001
        });

        $(".the_sum_of_tariffs").val(number_format(planData["min"][currencyISO], decimals, '.', ''));
      }
    }

    UpdatePlan();

  });

  function UpdatePlan() {

    let amount = $("input[name='Sum']").val();
    let plan = parseInt($("input[name='Plan']").val());
    let currency = parseInt($("input[name='currency']").val());
    let decimals = currency == 3 ? 8 : 2;
    let planData = plansData[plan];
    let currencyISO = "";
    let icon = "";
    let profit = amount / 100 * planData["percent"] * planData["counts"];
    if (currency == 1)
      icon = "₽";
    else if (currency == 2)
      icon = "$";
    else
      icon = "Ƀ";

    $("#summa").html(icon + number_format(amount, decimals, ',', ' '));
    $("#profit1").html(icon + number_format(profit, decimals, ',', ' '));
    $("#profit").html(icon + number_format(parseFloat(amount) + parseFloat(profit), decimals, ',', ' '));
    $("#days").html($(".calculator__item-block[data-plan=" + plan + "] ul li:first-child p:nth-child(2)").html());
    $("#countars").html($(".calculator__item-block[data-plan=" + plan + "] ul li:nth-child(2) p:nth-child(2)").html());
    $("#percents").html($(".calculator__item-block[data-plan=" + plan + "] .block-percent span").html());
    $("#nametar").html(planData["name"]);
    if ($('.nametar').length) {
      $('.nametar').html(planData["name"])
    }
  };

  $(".the_sum_of_tariffs").on("keyup", function () {
    UpdatePlan();
    calcRange.data("ionRangeSlider").update({
      from: $(this).val()
    });
  });

  // tarifs
  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = key => JSON.parse(localStorage.getItem(key));

  const titles = [...document.querySelectorAll('.statistic .statistic__block-stats h4')]

  if (titles.length) {
    if (getItem('data-value') === null) {
      setItem('data-value', 46639)
    }
    titles[2].setAttribute('data-value', getItem('data-value'))
    titles[2].textContent = number_format(getItem('data-value'), 0, ',', ' ')
    const lists = [...document.querySelectorAll('.statistic__block-table-list')]

    function newEvent(data) {
      // console.log(data);
      if (data.event == 'signup') {
        let newUsers = parseInt(titles[2].dataset.value) + 1;
        titles[2].textContent = number_format(newUsers, 0, ',', ' ')
        setItem('data-value', newUsers)
        titles[2].setAttribute('data-value', newUsers)
        lists[2].removeChild(lists[2].lastElementChild)

        const liElem = document.createElement('li')
        liElem.innerHTML = `
        <div class="date">${data.date}</div>
        <div class="person">
          <span>${data.country}</span>
          <h5>${data.login}</h5>
        </div>`
        lists[2].prepend(liElem)
      }
    }

    var socket = io.connect('https://ltd7.io:3030', {
      secure: true
    });

    socket.on('event', function (data) {
      newEvent(data);
    });
  }

  const slider_investors = new Swiper('.investors-slider', {
    loop: true,
    centeredSlides: true,
    autoHeight: 'auto',
    navigation: {
      prevEl: '.investors-button-prev',
      nextEl: '.investors-button-next'
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      }
    },
    on: {
      slideChange: function () {
        const plan = this.slides[this.activeIndex].dataset.plan;
        let amount = $("input[name='Sum']").val();
        let currency = parseInt($("input[name='currency']").val());
        let decimals = currency == 3 ? 8 : 2;
        let planData = plansData[plan];
        let currencyISO = "";
        let icon = "";
        let profit = amount / 100 * planData["percent"] * planData["counts"];
        if (currency == 1)
          icon = "₽";
        else if (currency == 2)
          icon = "$";
        else
          icon = "Ƀ";

        $(".min_sum").html(icon + number_format(amount, decimals, ',', ' '));
        $(".profit1").html(icon + number_format(profit, decimals, ',', ' '));
        $(".profit").html(icon + number_format(parseFloat(amount) + parseFloat(profit), decimals, ',', ' '));
        $(".percents").html(this.slides[this.activeIndex].querySelector('input[name="percents"]').value);
        $(".days").html(this.slides[this.activeIndex].querySelector('input[name="time"]').value);
        $(".nametar").html(planData["name"]);
      }
    }
  })



})