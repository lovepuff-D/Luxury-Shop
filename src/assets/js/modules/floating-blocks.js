import { computePosition, offset, flip, autoUpdate } from '@floating-ui/dom'

const floatingEls = document.querySelectorAll('*[data-floating-el]')
const referenceEls = document.querySelectorAll('*[data-floating-reference-el]')

floatingEls.forEach(floatingEl => {
  const referenceEl = Array.from(referenceEls).find(referenceEl => floatingEl.dataset.floatingEl === referenceEl.dataset.bindFloatingEl
  )

  referenceEl.addEventListener('click', () => {
    setTimeout(() => {
      window.addEventListener('click', closeFloatingBlocks)
    })
  })

  function closeFloatingBlocks() {
    console.log('click')
    floatingEl.classList.remove('is-active')
    window.removeEventListener('click', closeFloatingBlocks)
  }

  if (floatingEl.dataset.stopPropagation !== undefined) {
    floatingEl.addEventListener('click', (e) => {
      e.stopPropagation()
    })
  }

  addFloatingBlocks(referenceEl, floatingEl, floatingEl.dataset.floatingOffset ? floatingEl.dataset.floatingOffset : 12)
})

function addFloatingBlocks(referenceEl, floatingEl, offsetVal = 0) {
  offsetVal = Number(offsetVal)
  autoUpdate(referenceEl, floatingEl, () => {
    computePosition(referenceEl, floatingEl, {
      placement: 'bottom-end',
      middleware: [
        offset(offsetVal),
        flip()
      ],
    }).then(({ x, y }) => {
      Object.assign(floatingEl.style, {
        top: `${ y }px`,
        left: `${ x }px`,
      })
    })
  })
}