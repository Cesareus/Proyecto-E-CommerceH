/* eslint-disable no-undef */
import { services, URL } from '../servicesJS/services.js'

const formLogin = document.getElementById('modal-Login')
const logOut = document.getElementById('signOff')

formLogin.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(formLogin)
  services.ajax(`${URL}/assets/mvc/controller/Users.php?op=login`, data).done(res => {
    console.log(res)
    res = JSON.parse(res)
    console.log(typeof res.permisions)
    if (res.permisions === 1) {
      window.location = (`${URL}/administrator.html`)
    } else {
      location.reload()
    }
  })
})

logOut.addEventListener('click', () => {
  services.ajax(`${URL}/assets/mvc/controller/Users.php?op=logout`, null).done(res => {
    // eslint-disable-next-line no-undef
    location.reload()
  })
})

// userName.innerHTML=sessionStorage.getItem("user") ===null ? sessionStorage.getItem("user") : "Bienvenido/a usuario"
