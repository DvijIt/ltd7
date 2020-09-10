var OPEN_MENU = $('.header__menu');
var CLOSE_MENU = $('.aside__close');
var ASIDE = $('.aside');

var ActiveClass = {
  ASIDE: 'aside--shown'
}

var duration = 300;

OPEN_MENU.click(onOpenMenuClick);
CLOSE_MENU.click(onCloseMenuClick);

function onOpenMenuClick() {
  ASIDE.addClass(ActiveClass.ASIDE);
  setOverlay();
}

function onCloseMenuClick() {
  ASIDE.removeClass(ActiveClass.ASIDE);
  $('.webpage__overlay').remove();
}

function setOverlay() {
  var overlay = $('<div class="webpage__overlay"></div>');
  overlay.click(onCloseMenuClick);
  $('body').append(overlay);
}