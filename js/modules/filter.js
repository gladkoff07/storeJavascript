import { renderProductCards } from "./renderProductCards.js"

const filter = (products, productsContainer) => {

  const seriesFilterEl = document.querySelector('.js-filter-series')
  const seriesFilterItemsEl = document.querySelectorAll('.js-series-item')
  let currentSeriesFilter = null
  const btnShowMore = document.querySelector('.js-btn-show-more')

  const filterSeriesProducts = (series) => {
    const filteredProducts = products.filter((product) => {
      if (series && product.series !== series) {
        return false
      }
      return true
    })
    return filteredProducts
  }

  const handleSeriesFilterClick = () => {

    seriesFilterEl.addEventListener('click', (event) => {
      if (!event.target.matches('.filter-series__item')) {
        return
      }

      seriesFilterItemsEl.forEach(item => {
        item.classList.remove('filter-series__item--active')
      })
      event.target.classList.add('filter-series__item--active')

      if (event.target.dataset.value !== 'all') {
        currentSeriesFilter = event.target.dataset.value
      } else {
        currentSeriesFilter = null
      }

      const filteredProducts = filterSeriesProducts(currentSeriesFilter)
      renderProductCards(filteredProducts, productsContainer)
      btnShowMore.classList.add('hidden')
    })
  }

  handleSeriesFilterClick()
}

export { filter }