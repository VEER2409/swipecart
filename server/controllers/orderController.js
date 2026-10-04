const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { items, shippingAddress } = req.body;
    
    if (!items || items.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'No order items' });
    }
    
    if (!shippingAddress) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Verify stock and prices
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.productId || !item.quantity || item.quantity < 1) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Invalid item data' });
      }

      const product = await Product.findById(item.productId).session(session);
      
      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(409).json({ message: `Out of stock for product: ${product.name}` });
      }

      // Snapshot product details (fetch price from DB)
      const orderItem = {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      };
      
      orderItems.push(orderItem);
      totalAmount += product.price * item.quantity;
      
      // Atomically reduce stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    const order = await Order.create([{
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress
    }], { session });

    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json(order[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error.name === 'VersionError' || error.name === 'ValidationError' || (error.hasErrorLabel && error.hasErrorLabel('TransientTransactionError'))) {
      return res.status(409).json({ message: 'Stock changed during checkout. Please try again.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'id name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Status is required' });

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getMyOrders, getAdminOrders, updateOrderStatus };
