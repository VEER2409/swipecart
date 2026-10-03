const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not defined in .env');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      // These options are no longer necessary in Mongoose 6+, but keeping them for backward compatibility if older mongoose is used.
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log('MongoDB Connected');

    const email = process.argv[2] || 'admin@swipecart.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin';

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists with this email.');
      process.exit(0);
    }

    if (password.length < 6) {
      console.log('Password must be at least 6 characters.');
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    console.log(`Admin user created: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
