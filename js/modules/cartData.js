const cartData = () => {
  const cart = document.querySelector('.js-cart')
  const productList = document.querySelector('.js-list-products')
  const productGetInfo = {}
  const cartList = document.querySelector('.js-cart-list')
  const cartEmpty = document.querySelector('.js-cart-item-empty')
  const cartOrder = document.querySelector('.js-cart-item-order')
  const formatter = new Intl.NumberFormat('ru')

  const updateCartItemCount = () => {
    cart.addEventListener('click', (event) => {
      let currentItems, buttonMinus

      if (event.target.matches('.js-counter-minus') || event.target.matches('.js-counter-plus')) {
        const counter = event.target.closest('.js-cart-counter')
        currentItems = counter.querySelector('.js-counter-value')
        buttonMinus = counter.querySelector('.js-counter-minus')
      }

      if (event.target.matches('.js-counter-plus')) {
        currentItems.textContent = ++currentItems.textContent
        buttonMinus.removeAttribute('disabled')

        calculatCartTotalValue()
      }

      if (event.target.matches('.js-counter-minus')) {
        if (parseInt(currentItems.textContent) > 2) {
          currentItems.textContent = --currentItems.textContent

          calculatCartTotalValue()
        } else {
          currentItems.textContent = --currentItems.textContent
          buttonMinus.setAttribute('disabled', true)

          calculatCartTotalValue()
        }
      }
    })
  }
  updateCartItemCount()

  const addProductToCart = () => {
    productList.addEventListener('click', (event) => {
      if (event.target.classList.contains('js-products-buy')) {
        const product = event.target.closest('.js-products-item')
        const imageCart = product.querySelector('.js-products-img')
        const nameCart = product.querySelector('.js-products-name')
        const linkCart = product.querySelector('.js-products-link')
        const priceCart = product.querySelector('.js-products-price')

        productGetInfo.id = linkCart.getAttribute('id')
        productGetInfo.name = nameCart.textContent
        productGetInfo.price = priceCart.textContent
        productGetInfo.photo = imageCart.src

        const productInCart = cartList.querySelector(`#${productGetInfo.id}`)

        if (productInCart) {
          const productCurrentItems = productInCart.querySelector('.js-counter-value')
          const buttonMinus = productInCart.querySelector('.js-counter-minus')

          productCurrentItems.textContent = parseInt(productCurrentItems.textContent) + 1
          buttonMinus.removeAttribute('disabled')
        } else {
          renderProductInCart()
        }

        toggleCartStatus()
        calculatCartTotalValue()
      }
    })
  }
  addProductToCart()

  const renderProductInCart = () => {
    const li = document.createElement('li')
    li.classList.add('cart-list__item', 'js-cart-list-item')
    li.innerHTML = `
      <div class="cart-list__close js-item-remove"></div>
        <div class="cart-list__image">
          <img class="js-cart-list-img" src="${productGetInfo.photo}" alt="" />
        </div>
        <div class="cart-list__box" id="${productGetInfo.id}">
          <div class="cart-list__model">${productGetInfo.name}</div>
          <div class="cart-list__row">
            <div class="cart-counter cart-list__counter js-cart-counter">
              <button class="cart-counter__item js-counter-minus" type="button" disabled="disabled"> - </button>
              <div class="cart-counter__value js-counter-value">1</div>
              <button class="cart-counter__item js-counter-plus" type="button"> + </button>
            </div>
            <div class="cart-list__price js-cart-price" data-price="${productGetInfo.price}">${productGetInfo.price}<span>₽</span></div>
          </div>
        </div>
    `
    cartList.append(li)
  }

  const removeProductInCart = () => {
    cartList.addEventListener('click', (event) => {
      if (event.target.classList.contains('js-item-remove')) {
        const cartItem = event.target.closest('.js-cart-list-item')
        cartItem.remove()

        toggleCartStatus()
        calculatCartTotalValue()
      }
    })
  }
  removeProductInCart()

  const toggleCartStatus = () => {
    if (cart.querySelector('.js-cart-list-item')) {
      cartOrder.classList.remove('hidden')
      cartEmpty.classList.add('hidden')
    } else {
      cartOrder.classList.add('hidden')
      cartEmpty.classList.remove('hidden')
    }
  }
  toggleCartStatus()

  const calculatCartTotalValue = () => {
    const cartListItems = document.querySelectorAll('.js-cart-list-item')
    const cartTotalValue = document.querySelector('.js-cart-total-value')
    let totalValue = 0


    cartListItems.forEach(item => {
      const itemCount = item.querySelector('.js-counter-value')
      const itemPrice = item.querySelector('.js-cart-price')

      const itemTotalPrice = parseInt(itemCount.textContent) * parseInt(itemPrice.dataset.price.split(' ').join(''))
      itemPrice.textContent = formatter.format(itemTotalPrice)
      totalValue += itemTotalPrice
    })

    cartTotalValue.textContent = formatter.format(totalValue)
  }
  calculatCartTotalValue()
}

export { cartData }