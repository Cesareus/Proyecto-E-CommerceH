import { services, URL } from '../servicesJS/services.js'
import { displayList, setupPagination } from './pagination.js'

export let listProducts
const listCategory = document.querySelector('.header__category-list')

export const getProducts = async () => {
  try {
    return await services.ajax(`${URL}/assets/mvc/controller/productos.php?op=getProducts`, '')
      .then(info => JSON.parse(info))
  } catch (e) {
    console.log(e)
  }
}

const addCategory = (category, subCategories) => {
  const li = document.createElement('li')
  li.classList.add('header__category-li')

  li.innerHTML = `<a class="header__text" href="#">${category}</a>`
  listCategory.appendChild(li)

  for (const subCategory of subCategories) {
    if (subCategory === undefined) continue
    addSubcategory(subCategory, li)
  }
}

const addSubcategory = (subCategory, li) => {
  const liChildren = li.querySelector('ul')
  const liSubcategory = document.createElement('li')
  if (liChildren) {
    liSubcategory.classList.add('header__category-li')
    liSubcategory.innerHTML = `<a class="header__text" href="#">${subCategory}</a>`
    liChildren.appendChild(liSubcategory)
  } else {
    liSubcategory.classList.add('header__category-li')
    liSubcategory.innerHTML = `<a class="header__text" href="#">${subCategory}</a>`
    const ul = document.createElement('ul')
    ul.classList.add('header__subCategory-list')
    ul.appendChild(liSubcategory)
    li.appendChild(ul)
  }
}

const createCategoryList = (listProducts) => {
  const listProductsFiltred = listProducts.reduce(function (result, obj) {
    if (obj.subcategoria === '') return result
    if (!result[obj.categoria]) {
      result[obj.categoria] = []
    }
    if (result[obj.categoria].indexOf(obj.subcategoria) === -1) {
      result[obj.categoria].push(obj.subcategoria)
    }
    return result
  }, {})

  Object.keys(listProductsFiltred).forEach(function (category) {
    const subCategories = Object.values(listProductsFiltred[category])
    addCategory(category, subCategories)
  })
}

const render = async () => {
  const products = await getProducts()
  listProducts = products
  displayList(products)
  setupPagination(products)
  createCategoryList(products)
}

render()
