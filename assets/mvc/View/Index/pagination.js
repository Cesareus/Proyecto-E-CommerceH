import {listProducts} from "./indexLeerProductos.js"

const prevPage = document.querySelector("#bt__SliderLeft-Featured")
const nextPage = document.querySelector("#bt__SliderRight-Featured")
const products = document.querySelector("[mainDestacadosP]")
const parent =document.getElementById("pages")

const className ={
    classCard:"mainFeatured__Container--Card",
    classImg:"mainFeatured__Container--cardImg",
    classDiv:"mainFeatured__Container--CardDescriptionBox",
    classDescrip:"mainFeatured__Container--CardDescription",
    ClassPrice:"mainFeatured__Container--CardPrice"
}

let offset = 0 //el primer producto de la pagina --K
let limit = 9//ultimo producto de la pagina --K
let page = 1

prevPage.addEventListener("click", () =>{
    if(offset != 0){
        offset=offset - 10
        removePageNumber()
        loadPage(listProducts,offset,limit)

    } /** TO DO : colocar un else para inhabilidar el boton 😁 */
})

nextPage.addEventListener('click', () => {
    offset += limit+1
    if(listProducts.length>=offset){
    console.log(listProducts.length<offset);
    removeProducts(products);
    addPageNumber()
    loadPage(listProducts,offset,limit)
    }else{
        offset-=limit+1
    }})

const addProduct = (title, price, imgPath, className) => {
    /* console.log("nuevoProductos ejecutado"); */
    const card = document.createElement("div");
    const content = ` 
    <img src="${imgPath}" alt="" onerror="imgErrorHTML(this)" class="${className.classImg} cardImg" /> 
    <div class="${className.classDiv} cardDBox">
    <span class="${className.classDescrip} cardDescripcion">${title}</span>
    <span class="${className.ClassPrice} cardPrecio">${price}</span>
    </div>
    `;
    
    card.innerHTML = content;
    card.classList.add(className.s);
    card.classList.add("card");
    return card;
};

let numMaxPages
export const loadPage = (listProducts,offset=0,limit=9) =>{
    //recorremos la lista de productos iniciando el recorrido de la indice con el valor de "offset" hasta que el indice sea igual a "offset" + "limit" --K
    for (let i = offset; i <= offset+limit; i++){
        //si no hay nada en "listProducts" o en la posicion "i" de "listProducts" hace un "return" --K
        if(!listProducts || !listProducts[i]) return
        products.appendChild(
            addProduct(listProducts[i].titulo, listProducts[i].precio, listProducts[i].dir_imagen, className)
            )
        }
        numMaxPages = Math.ceil(listProducts.length / 10)
        parent.innerHTML = `Pagina ${page} de ${numMaxPages}`
    }
    
    function removeProducts(parent){
        //mientras haya productos en el contenedor "products" se eliminaran hasta que de false --K
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
            
        }
    }



function addPageNumber() {
    page+=1
    parent.innerHTML = `Pagina ${page} de ${numMaxPages}`
}

function removePageNumber() {
    while (parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
    page-=1
    if(page ===0){
    page=1
    parent.innerHTML = `Pagina ${page} de ${numMaxPages}`
    return
    }
    parent.innerHTML = `Pagina ${page} de ${numMaxPages}`
}