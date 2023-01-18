import { productosServices } from "../servicesJS/services.js";
import { displayList, setupPagination } from "./pagination.js";

export let listProducts
const listCategory = document.querySelector(".header__category-list")


const getProducts= async () =>{
  try {
    await productosServices.ajax('./assets/mvc/controller/productos.php?op=listar', '').done(function (info) {
      listProducts = JSON.parse(info);
    })}catch(e){
      console.log(e);
    }
  }
  const addCategory = (categories,subCategories) =>{
    
    for (const category of categories) {
      if (category === undefined) continue

      
      let li = document.createElement("li")
      li.classList.add(`header__category-li`)

      li.innerHTML = `<a class="header__text" href="#">${category}</a>`
      listCategory.appendChild(li)

      for (const subCategory of subCategories) {
      if (subCategory === undefined) continue

      let result = listProducts.filter(function(element) {
        return element.categoria === category && element.subcategoria === subCategory;
      });

        addSubcategory(subCategory,li,result)
      }
    }
  
}

const addSubcategory= (subCategory,li,result) =>{
  if(subCategory.length !== 0){
    const liChildren = li.querySelector("ul")
    let liSubcategory = document.createElement("li")
    if(liChildren && result.length>0){
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
  }


const render = async () => {
  await getProducts()
  //    loadPage(listProducts)
  displayList(listProducts)
  setupPagination(listProducts)

  const setOfCategories = new Set()
  const setOfSubcategories = new Set()
  listProducts.forEach(element => {
    console.log(element.subcategoria);
    setOfCategories.add(element.categoria)
    setOfSubcategories.add(element.subcategoria)
  });

  addCategory(setOfCategories,setOfSubcategories)

}

render();