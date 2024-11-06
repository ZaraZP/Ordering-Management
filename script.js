document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Retrieve form data
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const floorRoom = document.getElementById('floorRoom').value;
    const phone = document.getElementById('phone').value;
    const orderDetails = document.getElementById('order').value;

    // Save individual order details for rekap.html
    localStorage.setItem("orderName", name);
    localStorage.setItem("orderDepartment", department);
    localStorage.setItem("orderFloorRoom", floorRoom);
    localStorage.setItem("orderPhone", phone);
    localStorage.setItem("orderDetails", orderDetails);

    // Add order to ordersList for daftarPesanan.html
    const ordersList = JSON.parse(localStorage.getItem("ordersList")) || [];
    ordersList.push({ name, department, floorRoom, phone, details: orderDetails });
    localStorage.setItem("ordersList", JSON.stringify(ordersList));

    // Redirect to rekap.html
    window.location.href = "rekap.html";
});
