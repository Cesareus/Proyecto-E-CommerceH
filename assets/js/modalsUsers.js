let abrirLogin = document.getElementById('openLogin');
let cerrarLogin = document.getElementById('modalLogin__close');
let modalLogin = document.getElementById('modalLogin');
let containerLogin = document.getElementById('modalLogin__container');

let abrirRegister = document.getElementById('modalLogin__newAccount');
let cerrarRegister = document.getElementById('modalRegister__close');
let modalRegister = document.getElementById('modalRegister');
let containerRegister = document.getElementById('modalRegister__container');

let cuenta = document.getElementById('modalRegister__toAccount');

function showModal(modal) {
	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
	modal.style.display = 'none';
	document.body.style.overflow = 'auto';
}

abrirLogin.addEventListener('click', () => showModal(modalLogin));
cerrarLogin.addEventListener('click', () => hideModal(modalLogin));
window.addEventListener('click', (e) => {
	if (e.target === containerLogin) {
		hideModal(modalLogin);
	}
});

abrirRegister.addEventListener('click', () => {
	hideModal(modalLogin);
	showModal(modalRegister);
});
cerrarRegister.addEventListener('click', () => hideModal(modalRegister));
window.addEventListener('click', (e) => {
	if (e.target === containerRegister) {
		hideModal(modalRegister);
	}
});

cuenta.addEventListener('click', () => {
	hideModal(modalRegister);
	showModal(modalLogin);
});
