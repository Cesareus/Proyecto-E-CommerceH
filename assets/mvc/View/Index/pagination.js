import {listProducts} from "./indexLeerProductos.js"

const list_element = document.querySelector("[mainDestacadosP]")
const pagination_element  =document.getElementById("pages")
const prevPage = document.querySelector("#bt__SliderLeft-Featured")
const nextPage = document.querySelector("#bt__SliderRight-Featured")

let current_page = 1;
let rows = 10;

const className ={
    classCard:"mainFeatured__Container--Card",
    classImg:"mainFeatured__Container--cardImg",
    classDiv:"mainFeatured__Container--CardDescriptionBox",
    classDescrip:"mainFeatured__Container--CardDescription",
    ClassPrice:"mainFeatured__Container--CardPrice"
}

export function DisplayList (items=listProducts, wrapper=list_element, rows_per_page=rows, page=current_page) {
	wrapper.innerHTML = "";
	page--;
	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
        wrapper.appendChild(
            addProduct(paginatedItems[i].titulo, paginatedItems[i].precio, paginatedItems[i].dir_imagen, className)
            )
	}
}

export function SetupPagination (items, wrapper=pagination_element, rows_per_page=rows) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
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

	if (current_page === page) button.classList.add('active');
    
    
	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(items, list_element, rows, current_page);
        
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
	let pag =document.getElementById(current_page)
	pag.classList.remove("active")
	current_page--
	DisplayList()
	pag = document.getElementById(current_page)
	pag.classList.add('active');
})

nextPage.addEventListener("click", ()=>{
	let pag =document.getElementById(current_page)
	pag.classList.remove("active")
	current_page++
	DisplayList()
	pag = document.getElementById(current_page)
	pag.classList.add('active');
})