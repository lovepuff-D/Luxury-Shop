const qtyFrames = document.querySelectorAll('.product-checkout-card__qty')

if (qtyFrames.length) {
  qtyFrames.forEach(qtyFrame => {
    console.log(qtyFrame)
    const input = qtyFrame.querySelector('input')
    const addBtn = qtyFrame.querySelector('button[data-add-qty]')
    const removeBtn = qtyFrame.querySelector('button[data-remove-qty]')

    input.setAttribute('min', '1')

    addBtn.addEventListener('click', () => {
      if (input.value > 0) {
        input.value++
      }
    })

    removeBtn.addEventListener('click', () => {
      if (input.value > 1) {
        input.value--
      }
    })

  })
}