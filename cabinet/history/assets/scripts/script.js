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