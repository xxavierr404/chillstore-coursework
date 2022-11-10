let itemInfoMap = {
    "PS3": "PlayStation 3 Slim 500GB",
    "PS4": "PlayStation 4 PRO 500GB",
    "PS5": "PlayStation 5 1TB",
    "N3DS": "New Nintendo 3DS XL",
    "NX": "Nintendo Switch 32GB",
    "X360": "XBOX 360 512GB",
    "XONE": "XBOX ONE 1TB",
    "XSX": "XBOX Series X 1TB"
}

let itemPriceMap = {
    "PS3": 8000,
    "PS4": 30000,
    "PS5": 50000,
    "N3DS": 12000,
    "NX": 24000,
    "X360": 8000,
    "XONE": 28000,
    "XSX": 45000
}


const psLogoPath = "../res/images/ps-logo.svg";
const nintendoLogoPath = "../res/images/nintendo-logo.png";
const xboxLogoPath = "../res/images/xbox-logo.png";
let itemImageMap = {
    "PS3": psLogoPath,
    "PS4": psLogoPath,
    "PS5": psLogoPath,
    "N3DS": nintendoLogoPath,
    "NX": nintendoLogoPath,
    "X360": xboxLogoPath,
    "XONE": xboxLogoPath,
    "XSX": xboxLogoPath
}

function addCartItem(itemName, quantity) {
    let item = document.createElement("div");
    item.className = "cart-element";
    item.innerHTML = `<div class="cart-element-content" id="${'CART-ITEM-' + itemName}">
        <img class="cart-item-image" src="${itemImageMap[itemName]}" alt="Item">
        <p class="item-info">${itemInfoMap[itemName]}</p>
        <div class="flex-fill"></div>
        <div class="controls">
        <p class="item-price">${itemPriceMap[itemName]} руб.</p>
          <label for="quantity${itemCount}">Количество:</label>
          <input class="quantity" type="number" min="1" max="100" id="quantity${itemCount}" value="${quantity}">
          <button class="delete" data-bs-toggle="modal" data-bs-target="#deletionModal">Удалить</button>
        </div>
      </div>`;
    cartContainer.appendChild(item);
}

function deleteCartItemFromCookie(itemName) {
    document.cookie = `${itemName}=; max-age=0; path=/;`;
}

function updateQuantity(itemName, quantity) {
    document.cookie = `${encodeURIComponent(itemName)}=${quantity}; path=/;`;
}

function getOneItemPriceFromControl(control) {
    return Number(control.getElementsByClassName("item-price")[0].textContent.split(" ")[0]);
}

function getQuantityFromControl(control) {
    return control.getElementsByClassName("quantity")[0].value;
}

function updateSum() {
    let sumElement = document.getElementById("sum-cost");
    let sum = 0;
    for (let control of document.getElementsByClassName("controls")) {
        sum += getQuantityFromControl(control) * getOneItemPriceFromControl(control);
    }
    sumElement.textContent = `Сумма: ${sum} рублей.`;
}

let cookieStr = document.cookie;
let cartContainer = document.getElementById("cart-container");

let cartTitle = document.getElementById("cart-title");

let itemCount = 0;
let result = [];

for (let cookie of cookieStr.split("; ")) {
    let cookieSplit = cookie.split("=");
    result[cookieSplit[0]] = cookieSplit[1];
}
for (let name in result) {
    let quantity = result[name];
    if (name.startsWith("CART-ITEM-")) {
        name = name.replace("CART-ITEM-", "");
        itemCount++;
        addCartItem(name, quantity);
    }
}
cartTitle.textContent = `В Вашей корзине ${itemCount} товаров.`;

for (let quantityInput of document.getElementsByClassName("quantity")) {
    quantityInput.addEventListener("input", function () {
        this.value = this.value < 1 ? 1 : this.value > 100 ? 100 : this.value;
        updateQuantity(quantityInput.parentElement.parentElement.id, this.value);
        updateSum();
    });
}

for (let button of document.getElementsByClassName("delete")) {
    button.onclick = function () {
        let confirm = document.getElementById("delete-confirm");
        confirm.onclick = function () {
            deleteCartItemFromCookie(button.parentElement.parentElement.id);
            button.parentElement.parentElement.parentElement.remove();
            cartTitle.textContent = `В Вашей корзине ${--itemCount} товаров.`;
            updateSum();
        };
    };
}

updateSum();