const accordion = document.querySelector('.accordion')

if (accordion) {
  const items = document.querySelectorAll('.accordion .accordion__item')
  items.forEach(item => {
    const content = item.querySelector('.accordion__content')
    content.addEventListener('click', (e) => {
      e.stopPropagation()
    })
    item.addEventListener('click', (e) => {
      item.classList.toggle('accordion__item--active')
    })

  })
}
