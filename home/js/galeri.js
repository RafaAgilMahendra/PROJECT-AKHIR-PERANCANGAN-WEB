// inisialisasi
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    setupFilter();
    setupMobileMenu();
}

// logika keranjang
function setupCart() {
    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.querySelector("#close-cart");

    if (cartIcon) cartIcon.addEventListener("click", () => cart.classList.add("active"));
    if (closeCart) closeCart.addEventListener("click", () => cart.classList.remove("active"));

    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", addCartClicked);
    });

    const buyBtn = document.querySelector(".btn-buy");
    if (buyBtn) buyBtn.addEventListener("click", buyButtonClicked);
}

function addCartClicked(event) {
    const shopProduct = event.target.closest(".product-box");
    const title = shopProduct.querySelector(".product-title").innerText;
    const price = shopProduct.querySelector(".price").innerText;
    const productImg = shopProduct.querySelector(".product-img").src;
    
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    const cartItems = document.querySelector(".cart-content");
    const cartItemsNames = cartItems.querySelectorAll(".cart-product-title");

    for (let name of cartItemsNames) {
        if (name.innerText === title) {
            alert("Produk sudah ada di keranjang!");
            return;
        }
    }

    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    cartShopBox.innerHTML = `
        <img src="${productImg}" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bx-trash-alt cart-remove'></i>`;

    cartItems.appendChild(cartShopBox);
    cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
    cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
}

function removeCartItem(event) {
    event.target.parentElement.remove();
    updatetotal();
}

function quantityChanged(event) {
    if (isNaN(event.target.value) || event.target.value <= 0) event.target.value = 1;
    updatetotal();
}

function updatetotal() {
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(box => {
        const priceElement = box.querySelector(".cart-price");
        const quantity = box.querySelector(".cart-quantity").value;
        const price = parseFloat(priceElement.innerText.replace("Rp", "").replace(/\./g, ""));
        total += price * quantity;
    });
    const totalElement = document.querySelector(".total-price");
    if (totalElement) totalElement.innerText = "Rp" + total.toLocaleString("id-ID");
}

function buyButtonClicked() {
    alert("Pesanan berhasil diproses!");
    const cartContent = document.querySelector(".cart-content");
    if (cartContent) cartContent.innerHTML = "";
    updatetotal();
}

// ==================== LOGIKA FILTER ====================
function setupFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productBoxes = document.querySelectorAll(".product-box");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            document.querySelector(".filter-btn.active")
                ?.classList.remove("active");

            button.classList.add("active");

            const filter = button.dataset.filter;

            productBoxes.forEach(box => {
                const category = box.dataset.category;

                if (filter === "all" || category === filter) {

                    box.style.display = "flex";

                    setTimeout(() => {
                        box.classList.remove("hide");
                    }, 10);

                } else {

                    box.classList.add("hide");

                    setTimeout(() => {
                        box.style.display = "none";
                    }, 350);
                }
            });
        });
    });
}

// ==================== MOBILE MENU ====================
function setupMobileMenu() {
    const menuIcon = document.querySelector("#menu-icon");
    const navMenu = document.querySelector("#nav-menu");

    if (menuIcon && navMenu) {
        menuIcon.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuIcon.classList.toggle("bx-x");
        });
    }
}