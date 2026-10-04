const Product = require('../models/Product');
const Category = require('../models/Category');

const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    
    if (category) {
      const categoryObj = await Category.findOne({ slug: category });
      if (categoryObj) {
        query.category = categoryObj._id;
      } else {
        return res.json([]);
      }
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    const products = await Product.find(query).populate('category', 'name slug');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    
    if (!name || !description || price === undefined || !image || !category || stock === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (price < 0) return res.status(400).json({ message: 'Price cannot be negative' });
    if (stock < 0 || !Number.isInteger(stock)) return res.status(400).json({ message: 'Stock must be a non-negative integer' });

    const product = await Product.create({ name, description, price, image, category, stock });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    
    if (price !== undefined && price < 0) return res.status(400).json({ message: 'Price cannot be negative' });
    if (stock !== undefined && (stock < 0 || !Number.isInteger(stock))) return res.status(400).json({ message: 'Stock must be a non-negative integer' });

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
