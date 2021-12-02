const formAdd = document.getElementById('add-product')
const formEdit = document.getElementById('edit-product')
const formRemove = document.getElementById('remove-product')

let products = []

formAdd.addEventListener('submit', (e) => {
    e.preventDefault()
    const productName = document.getElementById('product-name');
    const amount = document.getElementById('amount');
    const price = document.getElementById('price');

    let product = {
        name: productName.value,
        amount: amount.value,
        price: price.value,
        summaryPrice: (price.value * amount.value).toFixed(2)
    }
    products.push(product)
    console.log(products)
})

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    const id = document.getElementById('product-id-edit')
    const productName = document.getElementById('product-name-edit')
    const amount = document.getElementById('amount-edit')
    const price = document.getElementById('price-edit')

    if (id.value == 0 || id.value > products.length) return;
    if (productName.value === "" || productName.value == null) productName.value = products[id.value - 1].name  //jeśli użytkownik nic nie wpisał w dane pole
    if (amount.value === "" || amount.value == null) amount.value = products[id.value - 1].amount //to bierzemy wartość już przypisaną do danego produktu
    if (price.value === "" || price.value == null) price.value = products[id.value - 1].price

    products[id.value - 1] = {
        name: productName.value,
        amount: amount.value,
        price: price.value,
        summaryPrice: (price.value * amount.value).toFixed(2)
    }
    console.log(products)
})

formRemove.addEventListener('submit', (e) => {
    e.preventDefault()
    const id = document.getElementById('product-id-remove')
    if (id.value == 0 || id.value > products.length) return;
    products.splice(id.value - 1, 1)
    console.log(products)
})
