import { productosServices } from "../servicesJS/services.js";
import { displayList, setupPagination } from "./pagination.js";

export let listProducts
const listCategory = document.querySelector(".header__category-list")

const getProducts= async () =>{
  try {
    await productosServices.ajax('https://talyx.com.ar/assets/mvc/controller/productos.php?op=listar', '').done(function (info) {
      listProducts = JSON.parse(info);
    })}catch(e){
      console.log(e);
    }
  }
  const addCategory = (category,subCategories) =>{
      let li = document.createElement("li")
      li.classList.add(`header__category-li`)

      li.innerHTML = `<a class="header__text" href="#">${category}</a>`
      listCategory.appendChild(li)

      for (const subCategory of subCategories) {
      if (subCategory === undefined) continue
        addSubcategory(subCategory,li)
      }
    }


const addSubcategory= (subCategory,li) =>{
    const liChildren = li.querySelector("ul")
    let liSubcategory = document.createElement("li")
    if(liChildren){
      liSubcategory.classList.add("header__category-li")
      liSubcategory.innerHTML = `<a class="header__text" href="#">${subCategory}</a>`
      liChildren.appendChild(liSubcategory)
    }
    else{
    liSubcategory.classList.add("header__category-li")
    liSubcategory.innerHTML = `<a class="header__text" href="#">${subCategory}</a>`
    let ul = document.createElement("ul")
    ul.classList.add("header__subCategory-list")
    ul.appendChild(liSubcategory)
    li.appendChild(ul)
    }
  }



const render = async () => {
  await getProducts()
  displayList(listProducts)
  setupPagination(listProducts)

  let listProductsFiltred = listProducts.reduce(function(result, obj) {
    if(obj.subcategoria === "") return result
    if (!result[obj.categoria]) {
        result[obj.categoria] = [];
    }
    if (result[obj.categoria].indexOf(obj.subcategoria) === -1) {
        result[obj.categoria].push(obj.subcategoria);
    }
    return result;
}, {});


Object.keys(listProductsFiltred).forEach(function(category) {
  const subCategories =Object.values(listProductsFiltred[category])
    addCategory(category,subCategories)
})
}

render();