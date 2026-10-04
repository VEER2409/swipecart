const express = require('express');
const router = express.Router();
const { getAdminOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getAdminOrders);
router.patch('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
