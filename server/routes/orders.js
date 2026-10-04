const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAdminOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
