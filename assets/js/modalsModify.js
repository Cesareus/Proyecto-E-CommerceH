import { getProductForId, modifyProduct, modifyProductsForm } from '../mvc/View/administrador/modifyProduct.js'

const closeModifyButton = document.getElementById('modalModify__close')
const modalModify = document.getElementById('modalModify')
const modalModifyContainer = document.getElementById('modalModify__container')

export async function renderModals () {
  const buttonsModify = document.getElementsByClassName('modify')
  const arbuttonsModify = Array.from(buttonsModify)

  setupModifyModal(arbuttonsModify, modalModify, modalModifyContainer)
}
let card
function setupModifyModal (buttons, modal) {
  buttons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault()
      let productId = null
      card = button.parentNode
      while (card && !card.classList.contains('mainFeatured__Container--Card')) {
        card = card.parentNode
      }
      productId = card.querySelector('input[type="hidden"]').value
      const product = JSON.parse(await getProductForId(productId))
      const category = modifyProductsForm.querySelector('[name="categoria"]')
      const subcategory = modifyProductsForm.querySelector('[name="subcategoria"]')
      const img = modifyProductsForm.querySelector('[name="dir_imagen"]')
      const title = modifyProductsForm.querySelector('[name="titulo"]')
      const description = modifyProductsForm.querySelector('[name="descripcion"]')
      const price = modifyProductsForm.querySelector('[name="precio"]')
      category.value = product[0].categoria
      subcategory.value = product[0].subcategoria
      img.value = product[0].dir_imagen
      title.value = product[0].titulo
      description.value = product[0].descripcion
      price.value = product[0].precio
      modifyProduct(productId)
      modal.style.display = 'block'
      closeModifyButton.addEventListener('click', function (e) {
        modalModify.style.display = 'none'
        window.location.reload()
      })

      window.addEventListener('click', function (e) {
        if (e.target === modalModifyContainer) {
          modalModify.style.display = 'none'
          window.location.reload()
        }
      })
    })
  })
}
