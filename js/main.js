const formAdd = document.getElementById('add-product')
const formEdit = document.getElementById('edit-product')
const formRemove = document.getElementById('remove-product')
const formSwap = document.getElementById('swap-product')

let products = []
Object.keys(localStorage).forEach((key) => {
    products[parseInt(key)] = JSON.parse(localStorage.getItem(key))
});

if (products.length !== 0) reload()

// localStorage.clear()
function reload() {
    var tab = document.getElementById("tab");
    while (tab.lastElementChild) {
        tab.removeChild(tab.lastElementChild);
    }

    let id = 1;
    let summaryPrice = 0;
    products.forEach(element => {
        var row = document.createElement("tr");
        row.className = 'data-row';
        var data = document.createElement("td");

        var idCell = row.insertCell(0);
        idCell.className = 'td-id'
        var nameCell = row.insertCell(1);
        nameCell.className = 'td-name';
        var amountCell = row.insertCell(2);
        amountCell.className = 'td-amount';
        var priceCell = row.insertCell(3);
        priceCell.className = 'td-price'

        idCell.innerHTML = id;
        nameCell.innerHTML = element.name;
        amountCell.innerHTML = element.amount;
        priceCell.innerHTML = element.price + " zł";

        summaryPrice += parseFloat(element.summaryPrice)
        tab.appendChild(row);
        id++;
    });

    var row = document.createElement("tr");
    row.id = 'summary-row'
    var data = document.createElement("td");

    var emptyCell = row.insertCell(0);
    emptyCell.className = 'td-id'
    var emptyCell = row.insertCell(1);
    emptyCell.className = 'td-name'
    var summaryCell = row.insertCell(2);
    summaryCell.className = 'td-amount'
    var summaryPriceCell = row.insertCell(3);
    emptyCell.className = 'td-price'

    // console.log("przed sparsowaniem " + summaryPrice)
    // parseFloat(summaryPrice)
    // console.log("po sparsowaniu i przed zaokrągleniem " + summaryPrice)
    // summaryPrice.toFixed(2);
    // console.log("po zaokrągleniu " + summaryPrice)
    summaryCell.appendChild(document.createTextNode("RAZEM"));
    summaryPriceCell.appendChild(document.createTextNode(summaryPrice.toFixed(2) + " zł"));
    tab.appendChild(row);
}


formAdd.addEventListener('submit', (e) => {
    e.preventDefault()
    const productName = document.getElementById('product-name');
    const amount = document.getElementById('amount');
    const price = document.getElementById('price');

    if (isNaN(amount.value) || isNaN(price.value)) return;
    let product = {
        name: productName.value,
        amount: amount.value,
        price: parseFloat(price.value).toFixed(2),
        summaryPrice: (price.value * amount.value).toFixed(2)
    }

    products.push(product)
    localStorage.setItem(products.indexOf(product), JSON.stringify(product))
    console.log(localStorage.getItem(products.indexOf(product)))
    reload();
    // console.log(products)
})

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    const id = document.getElementById('product-id-edit')
    const productName = document.getElementById('product-name-edit')
    const amount = document.getElementById('amount-edit')
    const price = document.getElementById('price-edit')

    if (id.value == 0 || id.value > products.length || isNaN(amount.value) || isNaN(price.value) || isNaN(id.value)) return;
    if (productName.value === "" || productName.value == null) productName.value = products[id.value - 1].name  //jeśli użytkownik nic nie wpisał w dane pole
    if (amount.value === "" || amount.value == null) amount.value = products[id.value - 1].amount //to bierzemy wartość już przypisaną do danego produktu
    if (price.value === "" || price.value == null) price.value = products[id.value - 1].price

    products[id.value - 1] = {
        name: productName.value,
        amount: amount.value,
        price: parseFloat(price.value).toFixed(2),
        summaryPrice: (price.value * amount.value).toFixed(2)
    }
    localStorage.setItem(id.value - 1, JSON.stringify(products[id.value - 1]))
     reload();
    // console.log(products)
})

formRemove.addEventListener('submit', (e) => {
    e.preventDefault()
    const id = document.getElementById('product-id-remove')
    if (id.value == 0 || id.value > products.length || isNaN(id.value)) return;
    products.splice(id.value - 1, 1)

    localStorage.clear()
    products.forEach((product, idx) => {
        localStorage.setItem(idx, JSON.stringify(products[idx]))
    })
    // console.log(products)
     reload();
})

formSwap.addEventListener('submit', (e) => {
    e.preventDefault()
    const id = document.getElementById('product-id-swap')
    const id2 = document.getElementById('product2-id-swap')
    if ((id.value == 0 || id.value > products.length) || (id2.value == 0 || id2.value > products.length) || isNaN(id.value) || isNaN(id2.value)) return;
    let tmp = products[id.value - 1]
    products[id.value - 1] = products[id2.value - 1]
    products[id2.value - 1] = tmp

    localStorage.removeItem(id.value - 1)
    localStorage.removeItem(id2.value - 1)
    localStorage.setItem(id.value - 1, JSON.stringify(products[id.value - 1]))
    localStorage.setItem(id2.value - 1, JSON.stringify(products[id2.value - 1]))
     reload();
    // console.log(products)
})

