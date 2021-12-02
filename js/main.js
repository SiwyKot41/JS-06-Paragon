const productName = document.getElementById('product-name')
const amount = document.getElementById('amount')
const price = document.getElementById('price')
const form = document.getElementById('add-product')
let products = []


form.addEventListener('submit', (e) => {
    let product = {
        name: productName.value,
        amount: amount.value,
        price: price.value
    }
    products.push(product)
})

// console.log(products)

function writeProducts() {
}