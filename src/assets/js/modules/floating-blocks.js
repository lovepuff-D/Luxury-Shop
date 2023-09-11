import { computePosition, offset, flip, autoUpdate } from '@floating-ui/dom'

const floatingEls = document.querySelectorAll('*[data-floating-el]')
const referenceEls = document.querySelectorAll('*[data-floating-reference-el]')

console.log(floatingEls, 'floatingEls')
console.log(referenceEls, 'referenceEls')

floatingEls.forEach(floatingEl => {
  const referenceEl = Array.from(referenceEls).find(referenceEl => floatingEl.dataset.floatingEl === referenceEl.dataset.bindFloatingEl
  )
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