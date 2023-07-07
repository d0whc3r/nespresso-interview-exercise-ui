import '@/styles/index.scss'

// Your code here
function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function populateProduct(selector, productData) {
  const productElement = document.querySelector(selector)
  productElement.innerHTML = ''
  const list = document.createElement('ul')
  const categories = ['id', 'title', 'description', 'price', 'discountPercentage', 'rating', 'stock', 'brand', 'category']
  categories.forEach((key, i, arr) => {
    const value = productData[key]
    const item = document.createElement('li')
    item.innerHTML = `<b>${key}</b>: ${value}`
    list.appendChild(item)
  })
  productElement.appendChild(list)
}

let clickInterval = 1_000 // 1 second
let clickTimeout = null

function clickProduct() {
  if (clickTimeout) {
    clearTimeout(clickTimeout)
  }
  clickTimeout = setTimeout(async () => {
    const productId = getRandomBetween(1, 50)
    const productData = await fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
    populateProduct('#fetched-data', productData)
  }, clickInterval)
}

function handleClick(selector) {
  const productElement = document.querySelector(selector)
  productElement.onclick = () => clickProduct()
}

function init() {
  handleClick('#fetch-json')
}

init()
