/* eslint-disable no-undef */
import { addListeners } from '../../../js/modalsUsers.js'
import { sesion } from './checkSession.js'
import { URL } from './services.js'

function validateAdminSesion (sesion) {
  $.ajax({
    url: `${URL}/assets/mvc/controller/Users.php?op=checkAdminSession`,
    success: function (data) {
      data = JSON.parse(data)
      if (data.status === 403) {
        sesion = true
        window.location = ('http://localhost/hunteando6/Proyecto-E-CommerceH/')
      } else {
        addListeners()
      }
    }
  })
}
validateAdminSesion(sesion)
// $(document).ready(() => validateAdminSesion(sesion))
