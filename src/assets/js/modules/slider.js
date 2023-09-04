/*
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

window.swipers = {}

const standardSwiperConfig = {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  direction: "horizontal",
  speed: 1000,
  grabCursor: true,
  slidesPerView: "auto",
  /!* on: {
    init: function () {
      this.el.querySelector(".hero-slider__counter").innerHTML =
        "<span>" + String(this.realIndex + 1).padStart(2, "0") + "</span><span>/</span><span>" + String(this.slides.length).padStart(2, "0") + "</span>";
    },
    slideChange: function () {
      this.el.querySelector(".hero-slider__counter").innerHTML =
        "<span>" + String(this.realIndex + 1).padStart(2, "0") + "</span><span>/</span><span>" + String(this.slides.length).padStart(2, "0") + "</span>";
    },
  }, *!/
};

const serviceListSwiper = document.querySelector('.services-list.swiper')
const workflowListSwiper = document.querySelector('.workflow-wrapper .swiper')

if (serviceListSwiper) {
  const localListSwiperConfig = {
    ...standardSwiperConfig,
    navigation: {
      nextEl: "[data-services-list-next-slide-handler]",
      prevEl: "[data-services-list-prev-slide-handler]",
    },
  }
  var swiper = new Swiper(serviceListSwiper, localListSwiperConfig);
}
if (workflowListSwiper) {
  const localListSwiperConfig = {
    ...standardSwiperConfig,
    simulateTouch	: false,
  }

  let swiper

  let mql = window.matchMedia("(min-width: 768px)")
  isEnabled(mql.matches)
  mql.addEventListener("change", (e) => {
    isEnabled(e.matches)
  })
  function isEnabled(isDesktop) {
    const itemsLength = document.querySelectorAll('.workflow__item.swiper-slide').length
    if (itemsLength <= 4 && isDesktop) {
      console.log('destroy slider')
      swiper && swiper.destroy()
      delete window.swipers.workflowListSwiper
    } else {
      console.log('add slider')
      swiper = new Swiper(workflowListSwiper, localListSwiperConfig)
      window.swipers.workflowListSwiper = swiper
    }
  }
}
*/
