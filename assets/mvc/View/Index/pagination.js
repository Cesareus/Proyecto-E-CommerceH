import { listProducts } from './getProducts.js'

const listElement = document.querySelector('[mainDestacadosP]')
const paginationElement = document.getElementById('pages')
const prevPage = document.querySelector('#bt__SliderLeft-Featured')
const nextPage = document.querySelector('#bt__SliderRight-Featured')

let currentPage = 1
const rows = 8
let pageCount = 0

const className = {
  classCard: 'mainFeatured__Container--Card',
  classImg: 'mainFeatured__Container--cardImg',
  classDiv: 'mainFeatured__Container--CardDescriptionBox',
  classDescrip: 'mainFeatured__Container--CardDescription',
  classPrice: 'mainFeatured__Container--CardPrice',
  classIcons: 'mainFeatured__Container--CardIcons',
  classDelete: 'mainFeatured__Container--CardDelete',
  classEdit: 'mainFeatured__Container--CardEdit'
}

export function displayList (items = listProducts, wrapper = listElement, rowsPerPage = rows, page = currentPage) {
  wrapper.innerHTML = ''
  page--
  const start = rowsPerPage * page
  const end = start + rowsPerPage
  const paginatedItems = items.slice(start, end)
  for (let i = 0; i < paginatedItems.length; i++) {
    wrapper.appendChild(
      addProduct(
        paginatedItems[i].titulo,
        paginatedItems[i].precio,
        paginatedItems[i].dir_imagen,
        paginatedItems[i].ID,
        className
      )
    )
  }
}

export function setupPagination (items, wrapper = paginationElement, rowsPerPage = rows) {
  wrapper.innerHTML = ''

  pageCount = Math.ceil(items.length / rowsPerPage)
  for (let i = 1; i < pageCount + 1; i++) {
    const btn = PaginationButton(i, items)
    wrapper.appendChild(btn)
  }
}

function PaginationButton (page, items) {
  const button = document.createElement('button')
  button.classList.add('mainFeatured__Container--pagenumbers--button')
  button.setAttribute('id', page)
  button.innerText = page

  if (currentPage === page) button.classList.add('active')

  button.addEventListener('click', function () {
    currentPage = page
    displayList(items, listElement, rows, currentPage)

    const currentBtn = document.querySelector(
      '.mainFeatured__Container--pagenumbers button.active'
    )
    currentBtn.classList.remove('active')
    button.classList.add('active')
  })

  return button
}

const addProduct = (title, price, imgPath, id, className) => {
  const card = document.createElement('div')
  let content
  if (document.URL.indexOf('administrator') > -1) {
    content = ` 
<input type="hidden" name="id" value="${id}">
<img src="${imgPath}" alt="" onerror="imgErrorHTML(this)" class="${className.classImg}" /> 
<div class="${className.classDiv}">
<span class="${className.classDescrip}">${title}</span>
<span class="${className.classPrice}">
${price}
<div class="${className.classIcons}">
<a id=""><i class="fa-solid fa-trash-can ${className.classDelete} delete"></i></a>
<a id="modify"><i class="fa-solid fa-pen ${className.classEdit} modify"></i></a>
</div>
</span>
</div>
`
  } else {
    content = ` 
    <img src="${imgPath}" alt="" onerror="imgErrorHTML(this)" class="${className.classImg}" /> 
    <div class="${className.classDiv}">
    <span class="${className.classDescrip}">${title}</span>
    <span class="${className.ClassPrice}">${price}</span>
    </div>
    `
  }

  card.innerHTML = content
  card.classList.add(className.classCard)
  return card
}

prevPage.addEventListener('click', () => {
  if (currentPage === 1) return
  let pag = document.getElementById(currentPage)
  pag.classList.remove('active')
  currentPage--
  displayList()
  pag = document.getElementById(currentPage)
  pag.classList.add('active')
})

nextPage.addEventListener('click', () => {
  if (currentPage === pageCount) return
  let pag = document.getElementById(currentPage)
  pag.classList.remove('active')
  currentPage++
  displayList()
  pag = document.getElementById(currentPage)
  pag.classList.add('active')
})
