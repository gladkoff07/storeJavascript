import { renderProductCards } from "./renderProductCards.js"

const filter = (products, productsContainer) => {

  const seriesFilterEl = document.querySelector('.js-filter-series')
  const seriesFilterItemsEl = document.querySelectorAll('.js-series-item')
  let currentSeriesFilter = null
  const btnShowMore = document.querySelector('.js-btn-show-more')
  const inputSearch = document.querySelector('.js-input-search')

  const filterSeriesProducts = (series, inputValue) => {
    const filteredProducts = products.filter((product) => {
      if (series && product.series !== series) {
        return false
      }
      if (inputValue && !product.model.toLowerCase().includes(inputValue.toLowerCase())) {
        return false
      }
      return true
    })
    return filteredProducts
  }

  const applyFilter = () => {
    const filteredProducts = filterSeriesProducts(currentSeriesFilter, inputSearch.value)
    renderProductCards(filteredProducts, productsContainer)
    btnShowMore.classList.add('hidden')
  }

  const handleSearchInput = () => {
    inputSearch.addEventListener('input', applyFilter)
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

      applyFilter()
    })
  }

  handleSearchInput()

  handleSeriesFilterClick()
}

export { filter }