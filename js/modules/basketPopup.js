const openBtn = document.querySelector('.js-btn-toggle-basket')
const closeBtn = document.querySelectorAll('.js-close-cart')
const blockPanel = document.querySelector('.js-panel')

const toggleCart = isActive => {
  document.body.style.overflow = isActive ? 'hidden' : ''
  blockPanel.classList.toggle('panel--active', isActive)
}

const openCart = () => {
  openBtn.addEventListener('click', () => {
    toggleCart(true)
  })
}

const closeCart = () => {
  closeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleCart(false)
    })
  })
}

export { openCart, closeCart }