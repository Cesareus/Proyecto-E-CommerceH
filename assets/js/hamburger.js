"use strict"

window.addEventListener('load', (event) => {

    console.log('page is fully loaded');

    /* Cuando hago CLICK .button, .nav TOGGLE 'activo' */

    let button = document.querySelector('#hamburgerButton');
    let nav = document.querySelector('.header__MenuNav');

    button.addEventListener('click', () => {
        console.log('activo');
        nav.classList.toggle('activo')
    });


});