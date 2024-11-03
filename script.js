// script.js
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Ambil data dari form
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value.trim(); // Menghapus spasi
    const order = document.getElementById('order').value;

    // Validasi format nomor telepon
    const phonePattern = /^\+62[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
        alert("Nomor telepon tidak valid. Pastikan formatnya benar, termasuk +62.");
        return;
    }

    // Format pesan untuk WhatsApp
    const message = `Halo, saya ingin memesan kebutuhan karyawan berikut:\n\n` +
                    `Nama: ${name}\n` +
                    `Nomor Telepon: ${phone}\n` +
                    `Detail Pesanan: ${order}`;

    // Encode URL untuk pengiriman
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Buka WhatsApp dengan URL yang sudah diencode
    window.open(whatsappUrl, '_blank');

    // Tampilkan pesan konfirmasi
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.style.display = 'block';
    confirmationMessage.innerHTML = `Pesanan Anda telah terkirim ke nomor <strong>${phone}</strong> dengan detail sebagai berikut:<br><br><strong>${order}</strong>`;
});
