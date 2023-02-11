import { modifyProduct } from '../mvc/View/administrador/modifyProduct.js'
import { render } from '../mvc/View/Index/getProducts.js'

const closeModifyButton = document.getElementById('modalModify__close')
const modalModify = document.getElementById('modalModify')
const modalModifyContainer = document.getElementById('modalModify__container')

async function renderModals () {
  await render()
  const buttonsModify = document.getElementsByClassName('modify')
  const arbuttonsModify = Array.from(buttonsModify)

  setupModifyModal(arbuttonsModify, modalModify, modalModifyContainer)
}
let card
function setupModifyModal (buttons, modal) {
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      let productId = null
      card = button.parentNode
      while (card && !card.classList.contains('mainFeatured__Container--Card')) {
        card = card.parentNode
      }
      productId = card.querySelector('input[type="hidden"]').value
      modifyProduct(productId)
      modal.style.display = 'block'
    })
  })
}

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

renderModals()
