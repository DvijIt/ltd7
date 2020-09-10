"use strict"

const menu = document.querySelector("#menu");
const menuBtn = document.querySelector("#menuBtn");
const container = document.querySelector(".container");

let height = menu.offsetHeight;

menuBtn.addEventListener("click", function () {
  if (!menu.classList.contains("sidebar--active")) {
    menu.classList.add("sidebar--active");
    container.style.maxHeight = height + "px";
    container.style.overflow = "hidden";
    setTimeout(function () {
      menuBtn.classList.add("menu-button--active")
    }, 200)
  } else {
    container.style.maxHeight = "initial";
    container.style.overflow = "visible";
    menu.classList.remove("sidebar--active");
    menuBtn.classList.remove("menu-button--active");
  }
})

const toggle_menu_btn = document.querySelector('.font-username > a')
const toggle_menu = document.querySelector('.user_menu')
toggle_menu_btn.addEventListener('click', function() {
  toggle_menu.classList.toggle('open')
})