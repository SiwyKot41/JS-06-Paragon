const formAdd = document.getElementById('add-product')
const formEdit = document.getElementById('edit-product')
let products = []

formAdd.addEventListener('submit', (e) => {
    const productName = document.getElementById('product-name');
    const amount = document.getElementById('amount');
    const price = document.getElementById('price');
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

formEdit.addEventListener('submit', (e) => {
    const id = document.getElementById('product-id')
    const productName = document.getElementById('product-name-edit')
    const amount = document.getElementById('amount-edit')
    const price = document.getElementById('price-edit')

    if (productName.value === "" || productName.value == null) productName.value = products[id.value - 1].name  //jeśli użytkownik nic nie wpisał w dane pole
    if (amount.value === "" || amount.value == null) amount.value = products[id.value - 1].amount //to bierzemy wartość już przypisaną do danego produktu
    if (price.value === "" || price.value == null) price.value = products[id.value - 1].price
    let product = {
        name: productName.value,
        amount: amount.value,
        price: price.value,
        summaryPrice: price.value * amount.value
    }
    products[id.value - 1] = product
    console.log(products)
    e.preventDefault()
})
