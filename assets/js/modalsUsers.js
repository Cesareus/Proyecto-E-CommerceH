const abrir = document.getElementById('openLogin');
const modalLogin = document.getElementById('modalLogin');
const modalRegister = document.getElementById('modalRegister');
const newAccount = document.getElementById('modalNewAccount');
const toAccount = document.getElementById('toAccount');
const container = document.getElementsByClassName('modal__container');
const cerrar = document.getElementsByClassName('modal__close');

function showModal (modal) {
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
}

function hideModal (modal) {
  modal.style.display = 'none'
  document.body.style.overflow = 'auto'
}

abrir.addEventListener('click', () => {
  hideModal(modalRegister)
	showModal(modalLogin)
})

toAccount.addEventListener('click', () => {
  hideModal(modalRegister)
	showModal(modalLogin)
})
newAccount.addEventListener('click', () => {
  hideModal(modalLogin)
	showModal(modalRegister)
})
for (let i = 0; i < cerrar.length; i++) {
  cerrar[i].addEventListener('click', () => {
    hideModal(modalLogin)
		hideModal(modalRegister)
	})
}
window.addEventListener('click', (e) => {
  for (let i = 0; i < container.length; i++) {
    if (e.target === container[i]) {
      hideModal(modalLogin)
			hideModal(modalRegister)
		}
  }
})
