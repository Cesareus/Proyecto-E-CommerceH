import { services, URL } from '../servicesJS/services.js'
const mailForm = document.getElementById('mailForm')
let data
const token = getParameterByName('token')
const email = getParameterByName('email')
const reset = Boolean(getParameterByName('reset'))
const ID = getParameterByName('ID')
const textParagrap = document.querySelector('.forgotPassword__phase')
if (reset && ID) {
  // eslint-disable-next-line no-undef
  const data = new FormData()
  data.append('ID', Number(ID))
  services.ajax(`${URL}/assets/mvc/controller/Users.php?op=resetTries`, data).done(res => {
    const passwordForm = `<p>Su cuenta con el email: ${email} fue habilitada exitosamente</p>`
    textParagrap.innerHTML = ''
    mailForm.innerHTML = passwordForm
  })
} else if (token === null && email === null) {
  mailForm.addEventListener('submit', (e) => {
    textParagrap.style.display = 'none'
    e.preventDefault()
    // eslint-disable-next-line no-undef
    data = new FormData(mailForm)
    try {
      services.ajax(`${URL}/assets/mvc/controller/Users.php?op=recoveryPasswordSendMail`, data).done(res => {
        if (res === 'intentos maximos alcanzados') {
          const passwordForm = `<p>El email: ${data.get('email')} supero el limite de intentos de reestablecer contraseña revisa tu mail para volver a activar tu cuenta</p>`
          mailForm.innerHTML = passwordForm
          return
        }
        res = Number(res)
        if (res === 1) {
          const passwordForm = `<p>Hemos enviado un correo a ${data.get('email')} por favor revisa tu correo para reestablecer la contraseña</p>`
          mailForm.innerHTML = passwordForm
        } else {
          const passwordForm = `<p>El correo ${data.get('email')} no esta registrado en Talyx</p>`
          mailForm.innerHTML = passwordForm
        }
      })
      return false
    } catch (e) {
      console.log(e)
    }
  })
} else {
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
    try {
      services.ajax(`${URL}/assets/mvc/controller/Users.php?op=resetPassword`, data).done(res => {
        if (res === 'vencido') {
          const passwordForm = '<p>Este codigo ya esta vencido solicite uno nuevo</p>'
          mailForm.innerHTML = passwordForm
        } else {
          const passwordForm = '<p>La contraseña fue reestablecida exitosamente</p>'
          mailForm.innerHTML = passwordForm
        }
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
