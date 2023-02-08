import { services, URL } from '../servicesJS/services.js'
const mailForm = document.getElementById('mailForm')
let data
const token = getParameterByName('token')
const email = getParameterByName('email')
const textParagrap = document.querySelector('.forgotPassword__phase')
if (token === null && email === null) {
  console.log('a')
  mailForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-undef
    data = new FormData(mailForm)
    try {
      console.log(data)
      services.ajax(`${URL}/assets/mvc/controller/Users.php?op=recoveryPasswordSendMail`, data).done(res => {
        console.log(res)
      })
      return false
    } catch (e) {
      console.log(e)
    }
  })
} else {
  console.log(token)
  console.log(email)
  textParagrap.style.display = 'none'
  const passwordForm = `
  <input type="email"
  required
  placeholder="E-mail"
  id="email"
  name="email"
  class="forgotPassword__input"
  value="${email}"></input>

  <input name="token"
  class="forgotPassword__input"
  type="hidden"
  value="${token}"></input>

  <input name="pass"
  class="forgotPassword__input"
  type="password"
  placeholder="Nueva contraseña"></input>

  <input name="code"
  class="forgotPassword__input"
  type="number"
  placeholder="Codigo de verificacion"></input>

  <small>El codigo de verificacion fue enviado a su e-mail</small>

  <button style="margin:auto;" class="forgotPassword__button" type="submit">Restablecer</button>`
  mailForm.innerHTML = passwordForm
  mailForm.style.display = 'flex'
  mailForm.style.flexDirection = 'column'
  mailForm.style.gap = '15px'
  mailForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-undef
    data = new FormData(mailForm)
    for (const [key, value] of data.entries()) {
      console.log(key + ': ' + value)
    }
    try {
      services.ajax(`${URL}/assets/mvc/controller/Users.php?op=resetPassword`, data).done(res => {
        console.log(res)
      })
      return false
    } catch (e) {
      console.log(e)
    }
  })
}

function getParameterByName (name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  // eslint-disable-next-line no-undef
  const results = regex.exec(location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
