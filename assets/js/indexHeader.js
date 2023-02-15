//  SCRIPT PARA DESPLIEGUE DE LISTA CATEGORIAS

const down = document.querySelector('.header__category-down')
const list = document.querySelector('.header__category-list')

let timeout

down.addEventListener('mouseover', function () {
  clearTimeout(timeout)
  list.style.visibility = 'visible'
})

down.addEventListener('mouseout', function () {
  timeout = setTimeout(() => {
    list.style.visibility = 'hidden'
  }, 200)
})

list.addEventListener('mouseover', function () {
  clearTimeout(timeout)
  list.style.visibility = 'visible'
})

list.addEventListener('mouseout', function () {
  timeout = setTimeout(() => {
    list.style.visibility = 'hidden'
  }, 600)
})

const downSign = document.querySelector('.header__user-welcome')
const listSign = document.querySelector('.signOff')

downSign.addEventListener('mouseover', function () {
  clearTimeout(timeout)
  listSign.style.visibility = 'visible'
})

downSign.addEventListener('mouseout', function () {
  timeout = setTimeout(() => {
    listSign.style.visibility = 'hidden'
  }, 200)
})

listSign.addEventListener('mouseover', function () {
  clearTimeout(timeout)
  listSign.style.visibility = 'visible'
})

listSign.addEventListener('mouseout', function () {
  timeout = setTimeout(() => {
    listSign.style.visibility = 'hidden'
  }, 600)
})
