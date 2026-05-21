const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves your frontend files

// Mock Database
const users = [];
const orders = [];
const products = [
    { id: 1, name: 'Wireless Headphones', price: 99, description: 'Noise-cancelling audio' },
    { id: 2, name: 'Mechanical Keyboard', price: 120, description: 'RGB backlighting' },
    { id: 3, name: 'Gaming Mouse', price: 60, description: 'High precision tracking' }
];

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    let user = users.find(u => u.username === username);
    if (!user) {
        user = { username, password };
        users.push(user); 
    }
    res.json({ message: 'Login successful', username });
});

// Products Endpoint
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Checkout Endpoint
app.post('/api/checkout', (req, res) => {
    const { username, cart } = req.body;
    if (!username || cart.length === 0) {
        return res.status(400).json({ message: 'Invalid order' });
    }
    const newOrder = { orderId: orders.length + 1, username, cart, status: 'Processed' };
    orders.push(newOrder);
    res.json({ message: 'Order processed successfully!', orderId: newOrder.orderId });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`E-commerce Server running on http://localhost:${PORT}`));