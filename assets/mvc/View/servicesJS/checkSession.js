/* eslint-disable no-undef */
import { URL } from './services.js'
const userName = document.getElementById('welcome__username')

export let sesion = false

function getSession () {
  $.ajax({
    url: `${URL}/assets/mvc/controller/Users.php?op=getSession`,
    success: function (data) {
      data = JSON.parse(data)
      if (data.user_name) {
        userName.innerHTML = `Bienvenido/a ${data.user_name}`
        sesion = true
      }
    }
  })
}

$(document).ready(getSession)
