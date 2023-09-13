const mobileMenuBtn = document.querySelector('.header__burger')
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('mobile-menu-active')
    freezeScroll()
  })
}

const openFilterBtn = document.querySelector('button[data-open-filter-frame]')
const closeFilterBtn = document.querySelector('button[data-close-filter-frame]')
const filterFrame = document.querySelector('.filter')

if (openFilterBtn && filterFrame) {
  openFilterBtn.addEventListener('click', () => {
    filterFrame.classList.add('filter--active')
    freezeScroll()
  })
  closeFilterBtn.addEventListener('click', () => {
    filterFrame.classList.remove('filter--active')
    freezeScroll()
  })
}

const addToCartBtn = document.querySelector('button[data-add-to-cart]')
const showContactModalBtn = document.querySelector('button[data-show-contact-modal]')

const closeModalBtns = document.querySelectorAll('button[data-close-modal]')
const overlay = document.querySelector('.overlay')

if (closeModalBtns.length) {
  closeModalBtns.forEach(closeModal => {
    closeModal.addEventListener('click', () => {
      const activeModal = document.querySelector('.modal.is-active')
      if (activeModal) {
        activeModal.classList.remove('is-active')
        overlay.classList.remove('is-active')
      }
    })
  })
}

if (addToCartBtn) {
  const checkoutFrame = document.querySelector('.modal[data-checkout-modal]')

  overlay.addEventListener('click', () => {
    overlay.classList.remove('is-active')
    checkoutFrame.classList.remove('is-active')
  })
  addToCartBtn.addEventListener('click', () => {
    overlay.classList.add('is-active')
    checkoutFrame.classList.add('is-active')
  })
}
if (showContactModalBtn) {
  const contactFrame = document.querySelector('.modal[data-contact-modal]')

  overlay.addEventListener('click', () => {
    overlay.classList.remove('is-active')
    contactFrame.classList.remove('is-active')
  })
  showContactModalBtn.addEventListener('click', () => {
    overlay.classList.add('is-active')
    contactFrame.classList.add('is-active')
  })
}

const openBasketSideBtn = document.querySelector('button[data-open-basket-side]')

if (openBasketSideBtn) {
  const closeBasketSideBtn = document.querySelector('button[data-close-basket-side]')
  const basketSide = document.querySelector('.basket-side')
  openBasketSideBtn.addEventListener('click', () => {
    basketSide.classList.add('is-active')
  })
  closeBasketSideBtn.addEventListener('click', () => {
    basketSide.classList.remove('is-active')
  })
}

const openSortDropdown = document.querySelector('button[data-open-sort-dropdown]')

if (openSortDropdown) {
  const sortDropdown = document.querySelector('.sort-dropdown')

  openSortDropdown.addEventListener('click', () => {
    sortDropdown.classList.add('is-active')
  })
}

const showMobileSearch = document.querySelector('button[data-open-header-mobile-search]')

if (showMobileSearch) {
  const header = document.querySelector('.header')
  const searchInput = document.querySelector('.header .search-input input')

  showMobileSearch.addEventListener('click', () => {
    header.classList.toggle('search-is-active')
    if (header.classList.contains('search-is-active')) {
      console.log(searchInput)
      searchInput.focus()
    }
  })
}

function freezeScroll() {
  document.documentElement.classList.toggle('over-hidden')
}