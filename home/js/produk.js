// Data Produk
const products = [
    { id: 1, name: "Nike AirMax", category: "sepatu", price: 1500000, img: "img/gambar5.jpeg" },
    { id: 2, name: "Crewneck", category: "pakaian", price: 500000, img: "img/gambar10.jpeg" },
    { id: 3, name: "Eiger", category: "tas", price: 750000, img: "img/gambar1.jpeg" },
    { id: 4, name: "Casio G-Shock", category: "aksesoris", price: 1200000, img: "img/gambar7.jpeg" },
    { id: 5, name: "Topi Nike", category: "topi", price: 150000, img: "img/topinikeRemovebg.png" },
    { id: 6, name: "Kacamata", category: "aksesoris", price: 850000, img: "img/gambar12.jpeg" },
    { id: 7, name: "Sabuk Kulit", category: "sabuk", price: 600000, img: "img/gambar9.jpeg" },
    { id: 8, name: "Celana Pendek", category: "celana", price: 150000, img: "img/gambar6.jpeg" },
    { id: 9, name: "The Nort Face Jacket", category: "pakaian", price: 5000000, img: "img/tnfwomenRemovebg.png" },
    { id: 10, name: "Adidas Samba", category: "sepatu", price: 2000000, img: "img/sepatu1Removebg.png" },
    { id: 11, name: "Polo t-shirt", category: "pakaian", price: 1200000, img: "img/gambar11.jpeg" },
    { id: 12, name: "Sandal ellesse", category: "sepatu", price: 1500000, img: "img/gambar8.jpeg" },
    { id: 13, name: "Topi Yankess", category: "topi", price: 950000, img: "img/gambar2.jpeg" },
    { id: 14, name: "Jam Eksklusif", category: "aksesoris", price: 1900000, img: "img/jamtangan1Removebg.png" }
];

let cart = []; // Array untuk menyimpan objek produk
const body = document.getElementById("productTableBody");

// Fungsi Render Tabel
function renderTable(filter = 'all') {
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    body.innerHTML = filtered.map(p => `
        <tr>
            <td class="cell-img"><img src="${p.img}" alt="${p.name}" width="50" /></td>
            <td class="prod-name">${p.name}</td>
            <td><span class="prod-cat">${p.category}</span></td>
            <td class="price">Rp${p.price.toLocaleString()}</td>
            <td><button class="btn-add" onclick="addToCart(${p.id})">Tambah</button></td>
        </tr>
    `).join("");
}

// Fungsi Tambah ke Keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, cartId: Date.now() }); // ID unik untuk setiap item
    document.getElementById('cartCount').innerText = cart.length;
}

/// Fungsi Buka Modal Keranjang
function viewCart() {
    const modal = document.getElementById("cartModal");
    const listDiv = document.getElementById("cartItemsList");
    const totalDiv = document.getElementById("cartTotal");

    if (cart.length === 0) {
        listDiv.innerHTML = "<p>Keranjang Anda masih kosong.</p>";
        totalDiv.innerHTML = "";
    } else {
        listDiv.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <span>${index + 1}. ${item.name} - Rp${item.price.toLocaleString()}</span>
                <button class="btn-hapus" onclick="removeFromCart(${item.cartId})">Hapus</button>
            </div>
        `).join("");
        
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        
        // Memperbarui totalDiv dengan menambahkan tombol Checkout
        totalDiv.innerHTML = `
            <div style="margin-top: 15px; border-top: 2px solid #eee; padding-top: 10px;">
                <p style="font-size: 1.1rem; margin-bottom: 10px;">Total Bayar: <strong>Rp${total.toLocaleString()}</strong></p>
                <button class="btn-checkout" onclick="checkout()">Checkout Sekarang</button>
            </div>
        `;
    }
    
    modal.style.display = "block";
}

function checkout() {
    // notifikasi sukses
    alert("Pesanan berhasil diproses! Terima kasih.");

    cart = []; 

    document.getElementById('cartCount').innerText = 0;

    closeCart();
    window.location.href = "produk.html"; 
}

// Fungsi Menutup Modal
function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

// Fungsi Hapus Item
function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    document.getElementById('cartCount').innerText = cart.length;
    viewCart(); // Refresh modal
}

// Hamburger & Filter Logic
document.querySelector('#menu-icon').addEventListener('click', () => {
    document.querySelector('.icons-container').classList.toggle('active');
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        renderTable(e.target.getAttribute('data-filter'));
    });
});

renderTable();