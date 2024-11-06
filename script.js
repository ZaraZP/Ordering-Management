document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Ambil data dari form
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const floorRoom = document.getElementById('floorRoom').value;
    const phone = document.getElementById('phone').value;
    const orderDetails = document.getElementById('order').value;

    // Buat objek pesanan baru
    const newOrder = { name, department, floorRoom, phone, details: orderDetails };

    // Update data pesanan ke JSONbin
    updateOrdersToJSONbin(newOrder);

    // Redirect ke rekap.html
    window.location.href = "rekap.html";
});

// Fungsi untuk memperbarui data pesanan ke JSONbin
async function updateOrdersToJSONbin(newOrder) {
    const BIN_ID = '672ae9bcad19ca34f8c4fcc2';  // Bin ID yang kamu buat di JSONbin
    const API_KEY = '$2a$10$FEfu2ALqeZP6wP1RJPK/g.FdAmKCn5yaYKSA/CTb73jsQKreyR7gK';  // X-Master-Key kamu
    const UPDATE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

    try {
        // Ambil data pesanan yang sudah ada
        const response = await fetch(UPDATE_URL, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const data = await response.json();
        const orders = data.orders || [];  // Ambil daftar pesanan atau buat array kosong jika tidak ada

        // Tambahkan pesanan baru ke dalam daftar
        orders.push(newOrder);

        // Update data di JSONbin dengan daftar pesanan yang sudah diperbarui
        const updateResponse = await fetch(UPDATE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({ orders: orders })
        });

        const result = await updateResponse.json();
        console.log('Pesanan berhasil diperbarui:', result);
    } catch (error) {
        console.error('Error saat memperbarui pesanan:', error);
    }
}

// Fungsi untuk mengambil dan menampilkan daftar pesanan dari JSONbin
async function fetchOrdersFromJSONbin() {
    const BIN_ID = '672ae9bcad19ca34f8c4fcc2';  // Bin ID kamu
    const API_KEY = '$2a$10$FEfu2ALqeZP6wP1RJPK/g.FdAmKCn5yaYKSA/CTb73jsQKreyR7gK';  // X-Master-Key kamu
    const READ_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

    try {
        // Ambil data pesanan dari JSONbin
        const response = await fetch(READ_URL, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const data = await response.json();
        const orders = data.orders || [];  // Ambil daftar pesanan atau array kosong jika tidak ada

        // Tampilkan pesanan di halaman
        const ordersListDiv = document.getElementById("ordersList");
        ordersListDiv.innerHTML = '';  // Kosongkan data sebelumnya

        orders.forEach((order, index) => {
            const orderDiv = document.createElement("div");
            orderDiv.className = "order-item";
            orderDiv.innerHTML = `
                <p><strong>Nama Pemesan:</strong> ${order.name}</p>
                <p><strong>Divisi/Departemen:</strong> ${order.department}</p>
                <p><strong>Lantai/Ruangan Tujuan:</strong> ${order.floorRoom}</p>
                <p><strong>Nomor HP Pengirim:</strong> ${order.phone}</p>
                <p><strong>Detail Pesanan:</strong> ${order.details}</p>
                <button onclick="markAsCompleted(${index})">Selesai</button>
                <hr>
            `;
            ordersListDiv.appendChild(orderDiv);
        });
    } catch (error) {
        console.error('Error saat mengambil pesanan:', error);
    }
}

// Fungsi untuk menandai pesanan sebagai selesai
async function markAsCompleted(orderIndex) {
    const BIN_ID = '672ae9bcad19ca34f8c4fcc2';
    const API_KEY = '$2a$10$FEfu2ALqeZP6wP1RJPK/g.FdAmKCn5yaYKSA/CTb73jsQKreyR7gK';
    const UPDATE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

    try {
        const response = await fetch(UPDATE_URL, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const data = await response.json();
        const orders = data.orders || [];

        // Menandai pesanan sebagai selesai
        orders[orderIndex].status = 'Selesai';

        // Update data di JSONbin
        const updateResponse = await fetch(UPDATE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({ orders })
        });

        const result = await updateResponse.json();
        console.log('Pesanan berhasil ditandai sebagai selesai:', result);
    } catch (error) {
        console.error('Error saat menandai pesanan selesai:', error);
    }
}
