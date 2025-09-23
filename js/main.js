"use strict"

import { closeCart, openCart } from "./modules/basketPopup.js"
import { cartData } from "./modules/cartData.js"
import { renderProducts } from "./modules/renderInitialProducts.js"
import { showMoreProducts } from "./modules/showMoreProducts.js"
// import { paginate } from "./modules/pagination.js"
import products from './products.js'

document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.querySelector('.js-list-products')
  let firstProductsIndex = 0
  let lastProductsIndex = 8

  // paginate(products)
  openCart()
  closeCart()
  cartData()
  renderProducts(products, productsContainer, firstProductsIndex, lastProductsIndex)
  showMoreProducts(products, productsContainer, firstProductsIndex, lastProductsIndex)
})