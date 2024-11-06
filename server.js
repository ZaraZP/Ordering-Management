const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Simulasi database
let orders = [];

// Endpoint untuk menambahkan pesanan
app.post('/api/orders', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.status(201).send({ message: 'Pesanan berhasil ditambahkan' });
});

// Endpoint untuk mendapatkan daftar pesanan
app.get('/api/orders', (req, res) => {
    res.status(200).json(orders);
});

// Endpoint untuk menghapus pesanan (misalnya selesai)
app.delete('/api/orders/:index', (req, res) => {
    const { index } = req.params;
    orders.splice(index, 1);
    res.status(200).send({ message: 'Pesanan telah selesai' });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
