# API Documentation

## Authentication Rules
- Public routes: No token required.
- Protected routes: Requires valid JWT of any user.
- Admin routes: Requires valid JWT of an admin user.

## Routes

### Auth
- `POST /api/auth/register`
  - Body: `{ name, email, password, confirmPassword }`
  - Public. Registers a customer.
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Public. Returns JWT.

### Categories
- `GET /api/categories` (Public)
- `POST /api/categories` (Admin) - Body: `{ name, description }`
- `PUT /api/categories/:id` (Admin)
- `DELETE /api/categories/:id` (Admin)

### Products
- `GET /api/products` (Public)
  - Query Params: `?category=<slug>&search=<text>`
- `GET /api/products/:id` (Public)
- `POST /api/products` (Admin)
  - Body: `{ name, description, price, image, category, stock }`
- `PUT /api/products/:id` (Admin)
- `DELETE /api/products/:id` (Admin)

### Orders
- `POST /api/orders` (Protected)
  - Body: `{ items: [{ productId, quantity }], shippingAddress }`
- `GET /api/orders/my-orders` (Protected)
- `GET /api/admin/orders` (Admin)
- `PATCH /api/admin/orders/:id/status` (Admin) - Body: `{ status }`

## Validation & Errors
- 400 Bad Request: Missing required fields, invalid email, short password, non-matching passwords, negative price/stock.
- 401 Unauthorized: Missing or invalid token.
- 403 Forbidden: Insufficient permissions (not admin).
- 404 Not Found: Resource not found.
- 409 Conflict: Email already exists, out of stock.

## First Admin Setup
- Create a script `server/scripts/createAdmin.js` that can be run once via CLI to safely seed the first admin account, bypassing the public registration flow.
