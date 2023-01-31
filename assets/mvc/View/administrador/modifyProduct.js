/* eslint-disable no-undef */
// import { services, URL } from '../servicesJS/services.js'
// falta intregarlos
// const modifyProductsForm = document.getElementById('')
// const cards = document.querySelectorAll('modificar')
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    const buttons = document.querySelectorAll('.modify-button')
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const card = button.parentElement
        const productId = card.querySelector('input[type="hidden"]').value
        console.log(productId)
      })
    })
  }, 51)
})
/*
modifyProductsForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(productsForm)
  try {
    services.ajax(`${URL}/assets/mvc/controller/productos.php?op=Modify`, data).done((info) => {
      console.log(info)
      const res = JSON.parse(info)
      console.log(res)
    })
  } catch (e) {
    console.log(e)
  }
}) */
