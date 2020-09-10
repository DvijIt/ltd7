document.addEventListener('DOMContentLoaded', function() {

  const btn_burger = document.querySelector('#burger')
  const navigation_menu = document.querySelector('#navigation_menu')

  btn_burger.addEventListener('click', function() {
    navigation_menu.classList.toggle('open')
  })

  const btn_registration = document.querySelector('#btn_registration')
  const header_top = document.querySelector('#header-top')

  btn_registration.addEventListener('click', function() {
    header_top.classList.toggle('open')
  })

})
