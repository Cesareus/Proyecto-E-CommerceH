/* eslint-disable no-undef */
import { services, URL } from '..servicesJS/services.js'

const productsForm = document.getElementById('modal__form')

productsForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(productsForm)
  try {
    services.ajax(`${URL}/assets/mvc/controller/productos.php?op=Create`, data).done((info) => {
      const res = JSON.parse(info)
      console.log(res)
    })
  } catch (e) {
    console.log(e)
  }
})
