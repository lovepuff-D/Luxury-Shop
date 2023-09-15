const overlay = document.querySelector('.overlay')

const onClickOutside = new CustomEvent('onClickOutside')

overlay.addEventListener('click', () => {
  overlay.dispatchEvent(onClickOutside);
})

overlay.addEventListener('onClickOutside', () => {
  window.overlay.hide()
})

window.overlay = {
  el: overlay,
  show: () => {
    overlay.classList.add('is-active')
  },
  hide: () => {
    overlay.classList.remove('is-active')
  },
  onClickOutside: (callback) => {
    callback()
  }
}

import "./modules/accordion.js";
import "./modules/slider.js";
import "./modules/teleport.js";
import "./modules/togglers.js";
import "./modules/floating-blocks.js";
import "./modules/tabs.js";
import "./modules/form.js";
import "./modules/input.js";
import "./modules/stories.js";

document.documentElement.style.setProperty('--header-height', document.querySelector('.header').clientHeight + 'px');


const resizeObserver = new ResizeObserver((entries) => {
  document.documentElement.style.setProperty('--header-height', entries[0].target.clientHeight + 'px');
});

resizeObserver.observe(document.querySelector('.header'));

import "swiper/css";
