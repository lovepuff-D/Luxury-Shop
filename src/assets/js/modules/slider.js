import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

window.swipers = []

// Render Navigation + Pagination for sliders

console.log(document.querySelectorAll('.swiper'))

function renderModules(swiper, isRenderNavigation = true, isRenderPagination = true) {
  if (isRenderNavigation) {
    const navigationPrevBtn = document.createElement('button')
    const navigationNextBtn = document.createElement('button')
    navigationPrevBtn.setAttribute('data-services-list-prev-slide-handler', '')
    navigationNextBtn.setAttribute('data-services-list-next-slide-handler', '')
    swiper.insertAdjacentElement('beforeend', navigationPrevBtn)
    swiper.insertAdjacentElement('beforeend', navigationNextBtn)
  }
  if (isRenderPagination) {
    const pagination = document.createElement('div')
    pagination.classList.add('swiper-pagination')
    swiper.insertAdjacentElement('beforeend', pagination)
  }
}


const standardSwiperConfig = {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  direction: 'horizontal',
  speed: 1000,
  grabCursor: true,
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '"></div>';
    },
  },
  navigation: {
    nextEl: 'button[data-services-list-next-slide-handler]',
    prevEl: 'button[data-services-list-prev-slide-handler]',
  },
};

const heroBanner = document.querySelector('.hero-banner .swiper')
const productSliders = document.querySelectorAll('.product-slider .swiper')
const productItemSliders = document.querySelector('.product-item__mobile-slider')
const reviewsSlider = document.querySelector('.reviews.swiper')

if (heroBanner) {
  renderModules(heroBanner)
  setTimeout(() => {
    window.swipers.push(new Swiper(heroBanner, {
      ...standardSwiperConfig,
      slidesPerView: 1,
    }))
  })
}

if (productSliders.length) {
  productSliders.forEach(productSlider => {
    renderModules(productSlider)
    setTimeout(() => {
      window.swipers.push(new Swiper(productSlider, {
        ...standardSwiperConfig
      }))
    })
  })
}

if (productItemSliders) {
  const thumbsGallery = document.querySelector('.product-item .thumbs-gallery')
  const mainSwiper = productItemSliders.cloneNode(true)
  const thumbSwiper = productItemSliders.cloneNode(true)

  mainSwiper.classList.remove('product-item__mobile-slider')
  mainSwiper.classList.add('product-item__desktop-slider')

  thumbSwiper.classList.remove('product-item__mobile-slider')
  thumbSwiper.classList.add('product-item__desktop-thumb-slider')

  thumbsGallery.insertAdjacentElement('beforeend', mainSwiper)
  thumbsGallery.insertAdjacentElement('beforeend', thumbSwiper)

  renderModules(productItemSliders)
  renderModules(mainSwiper)
  renderModules(thumbSwiper)
  setTimeout(() => {
    window.swipers.push(new Swiper(productItemSliders, {
      ...standardSwiperConfig,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: true,
      },
    }))
    const thumbSliderInst = new Swiper(thumbSwiper, {
      ...standardSwiperConfig,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    })
    const mainSwiperInst = new Swiper(mainSwiper, {
      ...standardSwiperConfig,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: true,
      },
      thumbs: {
        swiper: thumbSliderInst,
      },
    })

    window.swipers.push(thumbSliderInst)
    window.swipers.push(mainSwiperInst)
  })
}

if (reviewsSlider) {
  renderModules(reviewsSlider)
  setTimeout(() => {
    window.swipers.push(new Swiper(reviewsSlider, {
      ...standardSwiperConfig,
    }))
  })
}


/* if (workflowListSwiper) {
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
} */
