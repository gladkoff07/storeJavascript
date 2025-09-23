import { renderProducts } from "./renderInitialProducts.js"

const showMoreProducts = (products, productsContainer, firstProductsIndex, lastProductsIndex) => {

  const btnShowMore = document.querySelector('.js-btn-show-more')
  const showProducntsIncrement = 8

  const hideBtnShowMore = () => {
    if (lastProductsIndex >= products.length) {
      btnShowMore.classList.add('hidden')
    }
  }

  btnShowMore.addEventListener('click', () => {

    firstProductsIndex = lastProductsIndex
    lastProductsIndex += showProducntsIncrement

    renderProducts(products, productsContainer, firstProductsIndex, lastProductsIndex)

    btnShowMore.scrollIntoView({
      behavior: "smooth"
    })

    hideBtnShowMore()
  })

  hideBtnShowMore()
}

export { showMoreProducts }