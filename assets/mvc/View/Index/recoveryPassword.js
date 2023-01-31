/* eslint-disable no-undef */
import { services, URL } from '../servicesJS/services.js'

const mail = document.getElementById('')
const password = document.getElementById('')
let data
mail.addEventListener('submit', (e) => {
  e.preventDefault()
  data = new FormData(mail)
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

if (res !== false) {
  data.append('pass', res)
  password.addEventListener('submit', () => {
    services.ajax(`${URL}/assets/mvc/controller/Users.php?op=resetPassword`, data).done(res => {
      if (res === true) {
        console.log(res)
      } else {
        console.log(res)
      }
    })
  })
}
