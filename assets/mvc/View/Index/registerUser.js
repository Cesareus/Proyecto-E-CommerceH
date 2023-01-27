/* eslint-disable no-undef */
import { services, URL } from '../servicesJS/services.js'

const registerForm = document.getElementById('modalRegister__form')

registerForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(registerForm)
  try {
    console.log(data)
    services.ajax(`${URL}/assets/mvc/controller/Users.php?op=register`, data).done(res => {
      console.log(res)
    })
    return false
  } catch (e) {
    console.log(e)
  }
})
