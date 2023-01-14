//  SCRIPT PARA DESPLIEGUE DE LISTA CATEGORIAS

const down = document.querySelector('.header__category-down');
const list = document.querySelector('.header__category-list');

// OPCIÓN REDUNDADNTE

// down.addEventListener('mouseover', function () {
// 	list.style.visibility = 'visible';
// });

// down.addEventListener('mouseover', function () {
// 	clearTimeout(timeout);
// });

// down.addEventListener('mouseout', function () {
// 	timeout = setTimeout(function () {
// 		list.style.visibility = 'hidden';
// 	}, 200);
// });

// list.addEventListener('mouseover', function () {
// 	clearTimeout(timeout);
// });

// list.addEventListener('mouseout', function () {
// 	timeout = setTimeout(function () {
// 		list.style.visibility = 'hidden';
// 	}, 600);
// });

let timeout;

// OPCIÓN DE CHATGPT :P

down.addEventListener('mouseover', function () {
	clearTimeout(timeout);
	list.style.visibility = 'visible';
});

down.addEventListener('mouseout', function () {
	timeout = setTimeout(() => {
		list.style.visibility = 'hidden';
	}, 200);
});

list.addEventListener('mouseover', function () {
	clearTimeout(timeout);
	list.style.visibility = 'visible';
});

list.addEventListener('mouseout', function () {
	timeout = setTimeout(() => {
		list.style.visibility = 'hidden';
	}, 600);
});
