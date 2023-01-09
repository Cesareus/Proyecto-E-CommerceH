//  SCRIPT PARA DESPLIEGUE DE LISTA CATEGORIAS

const down = document.querySelector('.header__category-down');
const list = document.querySelector('.header__category-list');

down.addEventListener('mouseover', function () {
	list.style.display = 'flex';
});

list.addEventListener('mouseover', function () {
	clearTimeout(timeout);
});

list.addEventListener('mouseout', function () {
	timeout = setTimeout(function () {
		list.style.display = 'none';
	}, 800);
});

let timeout;
