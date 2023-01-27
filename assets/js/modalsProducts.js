const abrir = document.getElementById('open')
const cerrar = document.getElementById('modal__close')
const modal = document.getElementById('modal')
const modalContainer = document.getElementById('modal__container')

abrir.addEventListener('click', function () {
  modal.style.display = 'block'
})

cerrar.addEventListener('click', function () {
  modal.style.display = 'none'
})
window.addEventListener('click', function (e) {
  if (e.target === modalContainer) {
    modal.style.display = 'none'
  }
})
