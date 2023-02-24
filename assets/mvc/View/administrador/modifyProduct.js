/* eslint-disable no-undef */
import { services, URL } from '../servicesJS/services.js'

export const modifyProductsForm = document.getElementById('modalModifyProducts__form')

export function modifyProduct (productId) {
  modifyProductsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    handleSubmit(productId)
  })
  modifyProductsForm.setAttribute('submit-listener', true)
}

export function handleSubmit (productId) {
  const data = new FormData(modifyProductsForm)
  data.append('ID', productId)
  try {
    services.ajax(`${URL}/assets/mvc/controller/productos.php?op=Modify`, data).done((info) => {
      console.log(info)
      if (info === true) {
        window.location.reload()
      } else {
        console.log(info)
      }
    })
  } catch (e) {
    console.log(e)
  }
}
