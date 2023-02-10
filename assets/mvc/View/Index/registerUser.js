/* eslint-disable no-undef */
// import { services, URL } from '../servicesJS/services.js'

const registerForm = document.getElementById('modal-Reg')
const inputs = registerForm.querySelectorAll('input')
const expressions = {
  pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/ // expresion para que no haya espacios,contenga minimo 8 caracteres,al menos una mayuscula,un numero, una minuscula y un caracter especial
}

const validateForm = (e) => {
  console.log(e.target.name)
  switch (e.target.name) {
    case 'name':

      break
    case 'lastname':

      break

    case 'email':

      break
    case 'pass':
      if (expressions.pass.test(e.target.value)) {
        console.log('asd')
      }
      break

    default:
      break
  }
}

inputs.forEach(input => {
  input.addEventListener('keyup', validateForm)
  input.addEventListener('blur', validateForm)
})

registerForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(registerForm)
  try {
    console.log(data)
    // services.ajax(`${URL}/assets/mvc/controller/Users.php?op=register`, data).done(res => {

    console.log(registerForm.children)

    // })
    return false
  } catch (e) {
    console.log(e)
  }
})
