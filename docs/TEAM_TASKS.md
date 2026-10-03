# Team Tasks

## Contributor 1: Authentication & Setup
- **Responsibilities:** Backend authentication, User model, auth middleware, admin authorization middleware, and first-admin setup script. Environment setup and main server entry.
- **Owned Files:** `server/models/User.js`, `server/routes/auth.js`, `server/controllers/authController.js`, `server/middleware/authMiddleware.js`, `server/scripts/createAdmin.js`, `server/server.js`, `.env.example`.
- **Deliverables:** Working register/login APIs, JWT generation/validation, secure password hashing, admin auth middleware.
- **Acceptance:** Cannot register admins publicly, passwords hashed, protected routes reject missing tokens.

## Contributor 2: Core E-Commerce Backend
- **Responsibilities:** Categories, Products, Orders models/routes (including `GET /api/admin/orders` and `PATCH /api/admin/orders/:id/status`), and stock-safe checkout logic.
- **Owned Files:** `server/models/Category.js`, `server/models/Product.js`, `server/models/Order.js`, `server/routes/categories.js`, `server/routes/products.js`, `server/routes/orders.js`, controllers for these routes.
- **Deliverables:** Complete CRUD APIs, search/filter logic for products, atomic stock reduction on order placement.
- **Acceptance:** Cart prices verified against DB, stock reduced correctly, order history retrievable.

## Contributor 3: Customer Frontend & SwipeCart
- **Responsibilities:** Customer React pages (including Login and Register pages), cart state management, Swipe to Shop interactions, client routing setup, and API client configuration.
- **Owned Files:** `client/src/pages/(Home, Products, ProductDetails, Cart, Checkout, MyOrders, SwipeToShop, Login, Register)`, `client/src/components/(ProductCard, Navbar, SwipeCard)`, `client/src/App.jsx` (Routing), `client/src/api/axios.js`.
- **Deliverables:** Responsive UI, customer auth pages, cart functionality preventing over-stock additions, working swipe interactions.
- **Acceptance:** Swipe to Shop works on all devices, UI handles out-of-stock items cleanly.

## Contributor 4: Admin Frontend & Integration
- **Responsibilities:** Admin React pages, end-to-end integration checks, generic UI components (Toasts, Modals).
- **Owned Files:** `client/src/pages/admin/*`, generic components.
- **Deliverables:** Admin dashboard, category/product/order management UI.
- **Acceptance:** Admin can fully manage the store, UI correctly handles API errors and loading states.

## Collaboration Rules
- **Rule:** Do not independently edit another contributor's owned area without a Pull Request and coordination. Treat cross-team API contracts as strict dependencies.
