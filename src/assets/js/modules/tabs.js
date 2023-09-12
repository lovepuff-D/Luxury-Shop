const tabs = document.querySelectorAll('button[data-tab]')
const tabItems = document.querySelectorAll('div[data-tab-bind-to]')

if (tabs.length && tabItems.length) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab
      document.querySelector('.faq__tab--active').classList.remove('faq__tab--active')
      tab.classList.add('faq__tab--active')
      tabItems.forEach(tabItem => {
        tabItem.classList.remove('is-active')
        if (tabItem.dataset.tabBindTo === tabId) {
          tabItem.classList.add('is-active')
        }
      })
    })
  })
}