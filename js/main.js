const form = document.getElementById('add-product')
let products = []

form.addEventListener('submit', (e) => {
    const productName = document.getElementById('product-name')
    const amount = document.getElementById('amount')
    const price = document.getElementById('price')
    let product = {
        name: productName.value,
        amount: amount.value,
        price: price.value,
        summaryPrice: price.value * amount.value
    }
    products.push(product)
    console.log(products)
    e.preventDefault()
})
