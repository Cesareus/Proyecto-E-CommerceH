let abrirModify = document.getElementById('modify');
let cerrarModify = document.getElementById('modalModify__close');
let modalModify = document.getElementById('modalModify');
let modalModifyContainer = document.getElementById('modalModify__container');

abrirModify.addEventListener('click', function () {
	modalModify.style.display = 'block';
});

cerrarModify.addEventListener('click', function () {
	modalModify.style.display = 'none';
});

window.addEventListener('click', function (e) {
	if (e.target === modalModifyContainer) {
		modalModify.style.display = 'none';
	}
});
