import {listProducts} from "./indexLeerProductos.js"

const listElement = document.querySelector("[mainDestacadosP]")
const paginationElement  =document.getElementById("pages")
const prevPage = document.querySelector("#bt__SliderLeft-Featured")
const nextPage = document.querySelector("#bt__SliderRight-Featured")

let currentPage = 1;
let rows = 10;

const className ={
    classCard:"mainFeatured__Container--Card",
    classImg:"mainFeatured__Container--cardImg",
    classDiv:"mainFeatured__Container--CardDescriptionBox",
    classDescrip:"mainFeatured__Container--CardDescription",
    ClassPrice:"mainFeatured__Container--CardPrice"
}

export function displayList (items=listProducts, wrapper=listElement, rowsPerPage=rows, page=currentPage) {
	wrapper.innerHTML = "";
	page--;
	let start = rowsPerPage * page;
	let end = start + rowsPerPage;
	let paginatedItems = items.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
        wrapper.appendChild(
            addProduct(paginatedItems[i].titulo, paginatedItems[i].precio, paginatedItems[i].dir_imagen, className)
            )
	}
}

export function setupPagination (items, wrapper=paginationElement, rowsPerPage=rows) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rowsPerPage);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('button')
    button.classList.add("mainFeatured__Container--pagenumbers--button");
	button.setAttribute("id",page)
    button.innerText = page;

	if (currentPage === page) button.classList.add('active');
    
    
	button.addEventListener('click', function () {
		currentPage = page;
		displayList(items, listElement, rows, currentPage);
        
		let current_btn = document.querySelector('.mainFeatured__Container--pagenumbers button.active');
		current_btn.classList.remove('active');
		button.classList.add('active');
	});    
    
	return button;
}    

const addProduct = (title, price, imgPath, className) => {
    const card = document.createElement("div");
    const content = ` 
    <img src="${imgPath}" alt="" onerror="imgErrorHTML(this)" class="${className.classImg}" /> 
    <div class="${className.classDiv}">
    <span class="${className.classDescrip}">${title}</span>
    <span class="${className.ClassPrice}">${price}</span>
    </div>
    `;
    
    card.innerHTML = content;
    card.classList.add(className.classCard);    
    return card;
};

prevPage.addEventListener("click", () =>{
	let pag =document.getElementById(currentPage)
	pag.classList.remove("active")
	currentPage--
	displayList()
	pag = document.getElementById(currentPage)
	pag.classList.add('active');
})

nextPage.addEventListener("click", ()=>{
	let pag =document.getElementById(currentPage)
	pag.classList.remove("active")
	currentPage++
	displayList()
	pag = document.getElementById(currentPage)
	pag.classList.add('active');
})