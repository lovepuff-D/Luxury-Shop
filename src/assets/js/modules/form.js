const forms = document.querySelectorAll('form')

console.log(forms)

if (forms.length) {
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[type="text"]')
    form.addEventListener('submit', (e) => {
      inputs.forEach(input => {
        if (!input.value.length) {
          input.classList.add('main-input--error')
          e.preventDefault()
        } else {
          input.classList.remove('main-input--error')
        }
      })
    })
  })
}
