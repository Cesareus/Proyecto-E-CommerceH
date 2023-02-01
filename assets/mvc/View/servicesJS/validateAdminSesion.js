/* eslint-disable no-undef */
import { URL } from './services.js'
$(document).ready(function () {
  $.ajax({
    url: `${URL}/assets/mvc/controller/Users.php?op=checkAdminSession`,
    success: function (data) {
      data = JSON.parse(data)
      console.log(data)
      if (data.status === 403) {
        window.location = ('http://localhost/hunteando6/Proyecto-E-CommerceH/')
      }
    }
  })
})
