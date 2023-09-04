/*
import { computePosition, offset, flip, autoUpdate } from '@floating-ui/dom'

const inputs = document.querySelectorAll('.main-input, .main-select')
const selects = document.querySelectorAll('.main-select')

if (inputs.length) {
  inputs.forEach(customInput => {
    const input = customInput.querySelector('input')
    customInput.addEventListener('click', () => {
      input.focus()
    })
    const placeholder = customInput.querySelector('span')
    input.addEventListener('focus', () => {
      placeholder.classList.add('moved')
    })
    input.addEventListener('focusout', () => {
      if (!input.value.length) {
        placeholder.classList.remove('moved')
      }
    })
  })
}

if (selects.length) {
  selects.forEach(customSelect => {
    const input = customSelect.querySelector('input')
    const contentWrapper = customSelect.querySelector('.main-select__content')
    const items = customSelect.querySelectorAll('.main-select__item')
    customSelect.addEventListener('click', () => {
      customSelect.classList.remove('active')
      customSelect.classList.add('active')
      document.body.style.pointerEvents = 'none'
      customSelect.style.pointerEvents = 'all'
    })
    window.addEventListener('click', (e) => {
        if (e.target === document.querySelector('html')) {
          closeDropdown()
        }
      })
    items.forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          closeDropdown()
        })
        input.value = item.dataset.value
        console.log(input)
      })
    })
    addDropdown(customSelect, contentWrapper)
    function closeDropdown() {
      customSelect.classList.remove('active')
      document.body.style.removeProperty('pointer-events')
      customSelect.style.removeProperty('pointer-events')
    }
  })
}

function addDropdown(referenceEl, floatingEl) {
  autoUpdate(referenceEl, floatingEl, () => {
    computePosition(referenceEl, floatingEl, {
      placement: 'bottom',
      middleware: [
        offset(12),
        flip()
      ],
    }).then(({x, y}) => {
      Object.assign(floatingEl.style, {
        top: `${y}px`,
        left: `${x}px`,
      })
    })
  })
}

// Validation

const form = document.querySelector('.main-form')

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    let isValidationSuccess = true

    inputs.forEach(customInput => {
      if (customInput.dataset.isUnvalidated === '') return
      const input = customInput.querySelector('input')
      if (input.value.length) {
        input.style.removeProperty('border-color')
      } else {
        input.style.borderColor = 'red'
        isValidationSuccess = false
      }
    })

    if (isValidationSuccess) form.submit()
    console.log('submit')
  })
}*/
