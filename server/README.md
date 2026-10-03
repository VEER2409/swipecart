# Backend Authentication Module

This directory contains the initial Express server setup and Authentication features.

## Setup Instructions for Contributors (e.g. Contributor 2)

1. **Install Dependencies:**
   Navigate into the `server` directory and install the packages:
   ```bash
   cd server
   npm install
   ```

2. **Environment Variables:**
   Copy the example environment file and update it as needed:
   ```bash
   cp .env.example .env
   ```
   *Note: Set your `MONGO_URI` to a running MongoDB instance. Make sure to keep `.env` out of version control.*

3. **Running the Server:**
   - To run in development mode with auto-reload:
     ```bash
     npm run dev
     ```
   - To run normally:
     ```bash
     npm start
     ```

4. **First Admin Setup:**
   Run the following script to create your first admin user (bypassing public registration restrictions):
   ```bash
   node scripts/createAdmin.js <email> <password> <name>
   ```
   *Example: `node scripts/createAdmin.js admin@swipecart.com securepass123 "Store Admin"`*

## Available Middleware

For developing the core e-commerce endpoints (Categories, Products, Orders), you will need to protect routes using the provided middleware.

You can import them like this:
```javascript
const { protect, admin } = require('../middleware/authMiddleware');
```

- **`protect`**: Verifies that a valid JWT token is provided in the `Authorization: Bearer <token>` header. It attaches the decoded user payload to `req.user`. Use this for routes that any logged-in user can access (e.g., `POST /api/orders`).
- **`admin`**: Must be used *after* `protect`. Verifies that the authenticated user (`req.user`) has the `admin` role. Use this for admin-only routes (e.g., `POST /api/products`).

### Example Usage:
```javascript
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Public route
router.get('/', getProducts);

// Protected route (Any user)
router.post('/my-orders', protect, createOrder);

// Admin-only route
router.post('/', protect, admin, createProduct);

module.exports = router;
```
