document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah halaman reload

    // Ambil nilai dari form
    const order = {
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        floorRoom: document.getElementById("floorRoom").value,
        phone: document.getElementById("phone").value,
        details: document.getElementById("order").value
    };

    // Ambil daftar pesanan dari localStorage atau buat array baru
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // Tambahkan pesanan baru ke daftar
    orders.push(order);
    
    // Simpan daftar pesanan yang diperbarui ke localStorage
    localStorage.setItem("orders", JSON.stringify(orders));

    // Pindah ke halaman rekap
    window.location.href = "rekap.html";
});
