const abrirLogin = document.getElementById('openLogin')
const cerrarLogin = document.getElementById('modalLogin__close')
const modalLogin = document.getElementById('modalLogin')
const containerLogin = document.getElementById('modalLogin__container')

const abrirRegister = document.getElementById('modalLogin__newAccount')
const cerrarRegister = document.getElementById('modalRegister__close')
const modalRegister = document.getElementById('modalRegister')
const containerRegister = document.getElementById('modalRegister__container')

const cuenta = document.getElementById('modalRegister__toAccount')

function showModal (modal) {
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
}

function hideModal (modal) {
  modal.style.display = 'none'
  document.body.style.overflow = 'auto'
}

abrirLogin.addEventListener('click', () => showModal(modalLogin))
cerrarLogin.addEventListener('click', () => hideModal(modalLogin))
window.addEventListener('click', (e) => {
  if (e.target === containerLogin) {
    hideModal(modalLogin)
  }
})

abrirRegister.addEventListener('click', () => {
  hideModal(modalLogin)
  showModal(modalRegister)
})
cerrarRegister.addEventListener('click', () => hideModal(modalRegister))
window.addEventListener('click', (e) => {
  if (e.target === containerRegister) {
    hideModal(modalRegister)
  }
})

cuenta.addEventListener('click', () => {
  hideModal(modalRegister)
  showModal(modalLogin)
})
