const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');
const Product = require('../models/Product');

dotenv.config();

const categoriesData = [
  { name: 'Electronics', slug: 'electronics', description: 'Gadgets, devices, and tech accessories.' },
  { name: 'Fashion', slug: 'fashion', description: 'Apparel and clothing for everyone.' },
  { name: 'Shoes', slug: 'shoes', description: 'Footwear for all occasions.' },
  { name: 'Home', slug: 'home', description: 'Furniture, decor, and home essentials.' },
  { name: 'Accessories', slug: 'accessories', description: 'Bags, watches, jewelry, and more.' }
];

const productsData = [
  // Electronics (10)
  { name: 'Ultra HD Smart TV', price: 799.99, stock: 45, categoryName: 'Electronics', description: '55-inch 4K Ultra HD Smart TV with HDR.' },
  { name: 'Pro Gaming Laptop', price: 1499.00, stock: 20, categoryName: 'Electronics', description: 'High-performance laptop with RTX 4070.' },
  { name: 'Wireless Noise-Canceling Headphones', price: 249.50, stock: 150, categoryName: 'Electronics', description: 'Over-ear headphones with active noise cancellation.' },
  { name: 'Smartphone 14 Pro', price: 999.00, stock: 85, categoryName: 'Electronics', description: 'Latest flagship smartphone with amazing camera.' },
  { name: 'Smart Home Hub', price: 129.99, stock: 200, categoryName: 'Electronics', description: 'Voice-controlled smart home assistant.' },
  { name: 'Mechanical Gaming Keyboard', price: 89.99, stock: 120, categoryName: 'Electronics', description: 'RGB mechanical keyboard with tactile switches.' },
  { name: 'Wireless Mouse', price: 49.99, stock: 300, categoryName: 'Electronics', description: 'Ergonomic wireless mouse with long battery life.' },
  { name: '4K Action Camera', price: 199.99, stock: 60, categoryName: 'Electronics', description: 'Waterproof action camera for extreme sports.' },
  { name: 'Portable Power Bank', price: 39.99, stock: 500, categoryName: 'Electronics', description: '20000mAh portable charger with fast charging.' },
  { name: 'Bluetooth Speaker', price: 59.99, stock: 250, categoryName: 'Electronics', description: 'Waterproof portable bluetooth speaker.' },

  // Fashion (10)
  { name: 'Classic Denim Jacket', price: 79.99, stock: 100, categoryName: 'Fashion', description: 'Vintage wash denim jacket for everyday wear.' },
  { name: 'Cotton Crewneck T-Shirt', price: 19.99, stock: 400, categoryName: 'Fashion', description: 'Comfortable 100% cotton basic t-shirt.' },
  { name: 'Slim Fit Chinos', price: 49.99, stock: 150, categoryName: 'Fashion', description: 'Versatile slim-fit chino pants.' },
  { name: 'Winter Puffer Coat', price: 129.99, stock: 80, categoryName: 'Fashion', description: 'Warm and insulated puffer coat.' },
  { name: 'Floral Summer Dress', price: 59.99, stock: 120, categoryName: 'Fashion', description: 'Lightweight and breezy summer dress.' },
  { name: 'Merino Wool Sweater', price: 89.99, stock: 90, categoryName: 'Fashion', description: 'Soft and warm merino wool pullover.' },
  { name: 'Athletic Joggers', price: 39.99, stock: 200, categoryName: 'Fashion', description: 'Comfortable joggers for gym or lounging.' },
  { name: 'Formal Button-Up Shirt', price: 45.00, stock: 160, categoryName: 'Fashion', description: 'Crisp white formal shirt for office wear.' },
  { name: 'Leather Biker Jacket', price: 199.99, stock: 40, categoryName: 'Fashion', description: 'Genuine leather classic biker jacket.' },
  { name: 'Cozy Pajama Set', price: 34.99, stock: 180, categoryName: 'Fashion', description: 'Soft cotton two-piece pajama set.' },

  // Shoes (10)
  { name: 'Running Sneakers', price: 119.99, stock: 140, categoryName: 'Shoes', description: 'Lightweight athletic shoes for running.' },
  { name: 'Leather Oxford Shoes', price: 149.99, stock: 75, categoryName: 'Shoes', description: 'Classic formal leather oxfords.' },
  { name: 'Canvas Slip-Ons', price: 45.00, stock: 300, categoryName: 'Shoes', description: 'Casual and comfortable canvas shoes.' },
  { name: 'Hiking Boots', price: 139.99, stock: 60, categoryName: 'Shoes', description: 'Durable waterproof boots for hiking.' },
  { name: 'High-Top Sneakers', price: 89.99, stock: 110, categoryName: 'Shoes', description: 'Trendy high-top lifestyle sneakers.' },
  { name: 'Suede Loafers', price: 95.00, stock: 85, categoryName: 'Shoes', description: 'Elegant suede loafers for smart-casual looks.' },
  { name: 'Platform Sandals', price: 55.99, stock: 130, categoryName: 'Shoes', description: 'Stylish platform summer sandals.' },
  { name: 'Winter Snow Boots', price: 110.00, stock: 50, categoryName: 'Shoes', description: 'Insulated boots for extreme cold weather.' },
  { name: 'Minimalist White Sneakers', price: 79.99, stock: 250, categoryName: 'Shoes', description: 'Versatile everyday white sneakers.' },
  { name: 'Formal High Heels', price: 85.00, stock: 90, categoryName: 'Shoes', description: 'Classic black pumps for formal events.' },

  // Home (10)
  { name: 'Ceramic Coffee Mug Set', price: 24.99, stock: 200, categoryName: 'Home', description: 'Set of 4 artisan ceramic mugs.' },
  { name: 'Memory Foam Mattress Topper', price: 89.99, stock: 60, categoryName: 'Home', description: '2-inch cooling memory foam topper.' },
  { name: 'Minimalist Desk Lamp', price: 39.99, stock: 150, categoryName: 'Home', description: 'LED desk lamp with adjustable brightness.' },
  { name: 'Cotton Bed Sheets', price: 59.99, stock: 120, categoryName: 'Home', description: '400 thread count 100% cotton sheet set.' },
  { name: 'Non-Stick Cookware Set', price: 129.99, stock: 45, categoryName: 'Home', description: '10-piece aluminum non-stick pots and pans.' },
  { name: 'Robot Vacuum Cleaner', price: 249.99, stock: 30, categoryName: 'Home', description: 'Smart robot vacuum with mapping tech.' },
  { name: 'Aromatherapy Diffuser', price: 34.99, stock: 180, categoryName: 'Home', description: 'Essential oil diffuser with LED lights.' },
  { name: 'Velvet Throw Pillow', price: 19.99, stock: 300, categoryName: 'Home', description: 'Soft decorative velvet throw pillow.' },
  { name: 'Wooden Coffee Table', price: 149.00, stock: 25, categoryName: 'Home', description: 'Mid-century modern wooden coffee table.' },
  { name: 'Glass Food Storage Containers', price: 29.99, stock: 140, categoryName: 'Home', description: 'Set of 5 glass containers with locking lids.' },

  // Accessories (10)
  { name: 'Leather Crossbody Bag', price: 89.99, stock: 80, categoryName: 'Accessories', description: 'Stylish and practical leather everyday bag.' },
  { name: 'Classic Aviator Sunglasses', price: 49.99, stock: 200, categoryName: 'Accessories', description: 'UV400 protection aviator sunglasses.' },
  { name: 'Minimalist Wristwatch', price: 119.99, stock: 60, categoryName: 'Accessories', description: 'Elegant quartz movement wristwatch.' },
  { name: 'Canvas Backpack', price: 59.99, stock: 150, categoryName: 'Accessories', description: 'Durable canvas backpack for school or travel.' },
  { name: 'Sterling Silver Necklace', price: 75.00, stock: 90, categoryName: 'Accessories', description: 'Delicate silver chain with pendant.' },
  { name: 'Wool Beanie', price: 24.99, stock: 250, categoryName: 'Accessories', description: 'Warm knitted wool winter beanie.' },
  { name: 'Leather Belt', price: 34.99, stock: 180, categoryName: 'Accessories', description: 'Genuine leather reversible belt.' },
  { name: 'Travel Duffel Bag', price: 69.99, stock: 110, categoryName: 'Accessories', description: 'Spacious weekend travel bag.' },
  { name: 'Smartwatch Band', price: 19.99, stock: 400, categoryName: 'Accessories', description: 'Silicone replacement band for smartwatches.' },
  { name: 'Polarized Sports Sunglasses', price: 39.99, stock: 130, categoryName: 'Accessories', description: 'Lightweight polarized sunglasses for outdoor activities.' }
];

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not defined in .env');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');

    // 1. Process Categories (Reuse existing ones)
    const categoryMap = {};
    for (const catData of categoriesData) {
      let category = await Category.findOne({ slug: catData.slug });
      if (!category) {
        category = await Category.create(catData);
        console.log(`Created new category: ${category.name}`);
      } else {
        console.log(`Reusing existing category: ${category.name}`);
      }
      categoryMap[category.name] = category._id;
    }

    // 2. Process Products (Avoid duplicates)
    let addedCount = 0;
    for (const prodData of productsData) {
      const existingProduct = await Product.findOne({ name: prodData.name });
      if (!existingProduct) {
        // Use locally generated demo images based on the product category
        const imageUrl = `/images/demo/${prodData.categoryName.toLowerCase()}.jpg`;
        
        await Product.create({
          name: prodData.name,
          description: prodData.description,
          price: prodData.price,
          stock: prodData.stock,
          image: imageUrl,
          category: categoryMap[prodData.categoryName]
        });
        addedCount++;
        console.log(`Added product: ${prodData.name}`);
      } else {
        console.log(`Product already exists, skipping: ${prodData.name}`);
      }
    }

    console.log(`Seed complete! Added ${addedCount} new products.`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
