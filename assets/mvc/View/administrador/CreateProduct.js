/* eslint-disable no-undef */
import { services, URL } from '../servicesJS/services.js'

const productsForm = document.getElementById('modal_Products')

productsForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(productsForm)
  try {
    services.ajax(`${URL}/assets/mvc/controller/productos.php?op=Create`, data).done((info) => {
      console.log(info)
      const res = JSON.parse(info)
      console.log(res)
    })
  } catch (e) {
    console.log(e)
  }
})
