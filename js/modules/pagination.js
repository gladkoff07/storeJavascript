const paginate = (products) => {
  let productsCount = 7
  let currentPage = 1

  const productsContainer = document.querySelector('.js-list-products')
  const blockPagination = document.querySelector('.js-pagination')
  const btnPrevPagination = document.querySelector('.js-btn-pagination-prev')
  const btnNextPagination = document.querySelector('.js-btn-pagination-next')

  const renderProducts = (products, container, numberOfProducts, page) => {

    container.innerHTML = ''

    const firstProductIndex = numberOfProducts * page - numberOfProducts
    const lastProductIndex = firstProductIndex + numberOfProducts
    const productsOnPage = products.slice(firstProductIndex, lastProductIndex)

    productsOnPage.forEach(({ id, photo, model, prices }) => {
      const itemProduct = document.createElement('div')
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
      container.append(itemProduct)
    })
  }

  const renderPagination = (pagination, products, numberOfCounts) => {

    const pageCount = Math.ceil(products.length / numberOfCounts)
    const paginationList = document.querySelector('.js-pagination-list')

    for (let index = 1;index <= pageCount;index++) {
      const li = renderPaginationItem(index)
      paginationList.append(li)
    }

    pagination.classList.remove('pagination--hidden')
  }

  const renderPaginationItem = (page) => {

    const li = document.createElement('li')
    li.classList.add('list-pagination__item')
    li.textContent = page

    if (currentPage === page) {
      li.classList.add('list-pagination__item--active')
    }
    return li
  }

  const updatePagination = (pagination) => {

    pagination.addEventListener('click', (event) => {
      if (!event.target.closest('.list-pagination__item')) {
        return
      } else {
        currentPage = event.target.textContent
        renderProducts(products, productsContainer, productsCount, currentPage)
        let currentPaginationItem = document.querySelector('.list-pagination__item--active')
        currentPaginationItem.classList.remove('list-pagination__item--active')
        event.target.classList.add('list-pagination__item--active')
      }
    })
  }

  renderProducts(products, productsContainer, productsCount, currentPage)
  renderPagination(blockPagination, products, productsCount)
  updatePagination(blockPagination)

  const liElements = document.querySelectorAll('.list-pagination__item')

  const handleClickBntPagination = (event) => {
    let currentPaginationItem = document.querySelector('.list-pagination__item--active')
    let newActivePaginationItem

    if (event.target.closest('.js-btn-pagination-next')) {
      newActivePaginationItem = currentPaginationItem.nextElementSibling
      currentPage++
    } else {
      newActivePaginationItem = currentPaginationItem.previousElementSibling
      currentPage--
    }

    if (!newActivePaginationItem && event.target.closest('.js-btn-pagination-next')) {
      newActivePaginationItem = liElements[0]
    } else if (!newActivePaginationItem) {
      newActivePaginationItem = [...liElements].at(-1)
    }

    currentPaginationItem.classList.remove('list-pagination__item--active')
    newActivePaginationItem.classList.add('list-pagination__item--active')

    if (currentPage > liElements.length) {
      currentPage = 1
    } else if (currentPage < 1) {
      currentPage = liElements.length
    }

    renderProducts(products, productsContainer, productsCount, currentPage)
  }

  btnPrevPagination.addEventListener('click', handleClickBntPagination)
  btnNextPagination.addEventListener('click', handleClickBntPagination)
}

export { paginate }