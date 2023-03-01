/* eslint-disable no-undef */
import { services, URL } from '../servicesJS/services.js'

export const modifyProductsForm = document.getElementById('modalModifyProducts__form')

export async function modifyProduct (productId) {
  try {
    modifyProductsForm.addEventListener('submit', (e) => {
      e.preventDefault()
      handleSubmit(productId)
    })
    modifyProductsForm.setAttribute('submit-listener', true)
  } catch (e) {
    console.log(e)
  }
}

export function handleSubmit (productId) {
  const data = new FormData(modifyProductsForm)
  data.append('ID', productId)
  try {
    services.ajax(`${URL}/assets/mvc/controller/productos.php?op=Modify`, data).done((info) => {
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
export async function getProductForId (ID) {
  try {
    const data = new FormData()
    data.append('ID', ID)
    return await services.ajax(`${URL}/assets/mvc/controller/productos.php?op=getproductid`, data).done(info => JSON.parse(info))
  } catch (e) {
    console.log(e)
  }
}
