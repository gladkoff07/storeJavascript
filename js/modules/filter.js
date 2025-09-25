import { renderProductCards } from "./renderProductCards.js"

const filter = (products, productsContainer) => {

  const seriesFilterEl = document.querySelector('.js-filter-series')
  const seriesFilterItemsEl = document.querySelectorAll('.js-series-item')
  const btnShowMore = document.querySelector('.js-btn-show-more')
  const inputSearch = document.querySelector('.js-input-search')
  const priceFilterSelect = document.querySelector('.js-sorting-price')
  const priceFilterInputs = document.querySelectorAll('.js-filter-price-input')
  let currentSeriesFilter = null
  let currentPriceFilterSelect = 'default'
  let currentPriceFilterInputs = { min: 0, max: Infinity }

  const filterSeriesProducts = (series, inputValue, inputPrice) => {
    const filteredProducts = products.filter((product) => {
      if (series && product.series !== series) {
        return false
      }
      if (inputValue && !product.model.toLowerCase().includes(inputValue.toLowerCase())) {
        return false
      }
      const price = parseInt(product.prices[0].replace(/\s/g, ''), 10)
      if (price < inputPrice.min || price > inputPrice.max) {
        return false
      }
      return true
    })

    if (currentPriceFilterSelect === 'asc') {
      filteredProducts.sort((a, b) => {
        const priceA = parseInt(a.prices[0].replace(/\s/g, ''), 10)
        const priceB = parseInt(b.prices[0].replace(/\s/g, ''), 10)
        return priceA - priceB
      })
    } else if (currentPriceFilterSelect === 'desc') {
      filteredProducts.sort((a, b) => {
        const priceA = parseInt(a.prices[0].replace(/\s/g, ''), 10)
        const priceB = parseInt(b.prices[0].replace(/\s/g, ''), 10)
        return priceB - priceA
      })
    }

    return filteredProducts
  }

  const applyFilter = () => {
    const filteredProducts = filterSeriesProducts(currentSeriesFilter, inputSearch.value, currentPriceFilterInputs)
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

  const handlePriceFilterChange = () => {
    priceFilterSelect.addEventListener('change', () => {
      currentPriceFilterSelect = priceFilterSelect.value
      applyFilter()
    })
  }

  const handlePriceFilterInputChange = () => {

    const minPrice = parseInt(priceFilterInputs[0].value, 10) || 0
    const maxPrice = parseInt(priceFilterInputs[1].value, 10) || Infinity
    currentPriceFilterInputs = { min: minPrice, max: maxPrice }
    applyFilter()
  }

  priceFilterInputs.forEach(input => {
    input.addEventListener('input', handlePriceFilterInputChange)
  })

  handleSearchInput()
  handleSeriesFilterClick()
  handlePriceFilterChange()
}

export { filter }