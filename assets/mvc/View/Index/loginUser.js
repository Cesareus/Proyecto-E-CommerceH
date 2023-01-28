/* eslint-disable no-undef */
import { services, URL } from '../servicesJS/services.js'

const formLogin = document.getElementById('modalLogin__form')
const logOut = document.getElementById('cerrarsesion')

formLogin.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(formLogin)
  services.ajax(`${URL}/assets/mvc/controller/Users.php?op=login`, data).done(res => {
    res = JSON.parse(res)
    if (res.permisions === 1) {
      window.location = (`${URL}/administrator.html`)
    } else {
      location.reload()
    }
  })
})

logOut.addEventListener('click', () => {
  services.ajax(`${URL}/assets/mvc/controller/Users.php?op=logout`, null).done(res => {
    // TODO: añadir funcionalidad de la respuesta
    // eslint-disable-next-line no-undef
    location.reload()
  })
})

// userName.innerHTML=sessionStorage.getItem("user") ===null ? sessionStorage.getItem("user") : "Bienvenido/a usuario"
