/* eslint-disable no-undef */
import { services, URL } from '../servicesJS/services.js'

const registerForm = document.getElementById('modal-Reg')
const inputs = registerForm.querySelectorAll('input')
const expressions = {
  email: /^[^\s]+@[^\s]+$/,
  pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/ // expresion para que no haya espacios,contenga minimo 8 caracteres,al menos una mayuscula,un numero, una minuscula y un caracter especial
}
const names = {
  pass: false,
  email: false
}
const validateForm = (e) => {
  switch (e.target.name) {
    case 'name':
      // validateInput(expressions.name, e.target, 'name')
      break
    case 'lastname':
      // validateInput(expressions.lastname, e.target, 'lastname')
      break
    case 'email':
      validateInput(expressions.email, e.target, 'email')
      break
    case 'pass':
      validateInput(expressions.pass, e.target, 'pass')

      break

    default:
      break
  }
}
const validateInput = (expresion, input, name) => {
  if (expresion.test(input.value)) {
    document.getElementById(`error__${name}`).classList.add('error__check')
    document.getElementById(`error__${name}`).classList.add('error__inactive')
    names[name] = true
  } else {
    document.getElementById(`error__${name}`).classList.add('error__active')
    document.getElementById(`error__${name}`).classList.remove('error__check')
    document.getElementById(`error__${name}`).classList.remove('error__inactive')
    names[name] = false
  }
}
inputs.forEach(input => {
  input.addEventListener('keyup', validateForm)
  input.addEventListener('blur', validateForm)
})

registerForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (names.pass && names.email) {
    try {
      const data = new FormData(registerForm)
      services.ajax(`${URL}/assets/mvc/controller/Users.php?op=register`, data).done(res => {
        console.log(res)
        if (res === 'usuario ya existente') {
          const err = document.getElementById('error__email')
          err.innerText = 'Este email ya esta en uso prueba otro'
          err.classList.add('error__active')
          err.classList.remove('error__inactive')
        } else {
          window.location.reload()
        }
      })
      return false
    } catch (e) {
      console.log(e)
    }
  }
})
