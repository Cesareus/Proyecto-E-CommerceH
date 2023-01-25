let abrir = document.getElementById('open');
let cerrar = document.getElementById('modal__close');
let modal = document.getElementById('modal');
let modalContainer = document.getElementById('modal__container');

abrir.addEventListener('click', function () {
	modal.style.display = 'block';
});

cerrar.addEventListener('click', function () {
	modal.style.display = 'none';
});

window.addEventListener('click', function (e) {
	if (e.target === modalContainer) {
		modal.style.display = 'none';
	}
});
