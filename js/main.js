"use strict"

import { closeCart, openCart } from "./modules/basketPopup.js"
import { cartData } from "./modules/cartData.js"
import { paginate } from "./modules/pagination.js"
import products from './products.js'

document.addEventListener("DOMContentLoaded", function () {

  paginate(products)
  openCart()
  closeCart()
  cartData()
})