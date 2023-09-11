window.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.querySelector('.mobile-menu')
  if (mobileMenu) {
    const plug = document.createElement('div')
    plug.style.position = 'absolute'
    plug.id = 'mobile-menu-plug'
    document.body.appendChild(plug)
    plug.replaceWith(mobileMenu)
  }
})
