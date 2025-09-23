const renderProductCard = ({ id, photo, model, prices }) => {
  const itemProduct = document.createElement("div")
  itemProduct.classList.add('list-products__item', 'js-products-item')
  itemProduct.innerHTML = `
      <div class="list-products__img">
        <img src="${photo[0]}" alt="" class="js-products-img" />
      </div>
      <div class="list-products__body">
        <a class="list-products__link js-products-link" href="#" id="${id}">
          <span class="list-products__name js-products-name">${model}</span>
        </a>
        <div class="list-products__price js-products-price">${prices[0]}<span>₽</span></div>
        <button class="list-products__button js-products-buy" type="button">В корзину</button>
      </div>
    `
  return itemProduct
}

const appendProductCard = (product, container) => {
  container.append(product)
}

const renderProductCards = (products, container) => {
  container.innerHTML = ''

  products.forEach((product) => {
    const card = renderProductCard(product)

    appendProductCard(card, container)
  })
}

export { renderProductCards }
