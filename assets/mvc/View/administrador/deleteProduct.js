/* eslint-disable no-undef */
import { render } from '../Index/getProducts.js'
import { services, URL } from '../servicesJS/services.js'

async function deleteProducts () {
  await render()
  const deleteButtons = document.getElementsByClassName('delete')
  const arDeleteButtons = Array.from(deleteButtons)
  arDeleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      let productId = null
      let card = button.parentNode
      while (card && !card.classList.contains('mainFeatured__Container--Card')) {
        card = card.parentNode
      }
      productId = card.querySelector('input[type="hidden"]').value
      const data = new FormData()
      data.append('ID', productId)
      try {
        services.ajax(`${URL}/assets/mvc/controller/productos.php?op=Delete`, data).done((info) => {
          if (res === 1) {
            window.location.reload()
          }
        })
      } catch (e) {
        console.log(e)
      }
    })
  })
}
deleteProducts()
