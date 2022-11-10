let buttons = document.getElementsByClassName("add-to-cart");
let toast = document.getElementById("successToast");
for (let button of buttons) {
    button.addEventListener("click", function () {
        button.textContent = "В корзине";
        button.disabled = true;
        let item = button.getAttribute("data-item");
        document.cookie = `CART-ITEM-${encodeURIComponent(item)}=1; path=/;`;

        let bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    });
}
