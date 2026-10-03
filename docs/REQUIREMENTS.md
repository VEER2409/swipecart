# Requirements

## Features
- **Customer Experience:**
  - Register, login, logout.
  - View Home, Products, Product Details, Cart, Checkout, and My Orders pages.
  - Browse responsive product grid, search products, and filter by category.
  - View product image, name, price, category, and stock availability.
  - Manage cart (add, change quantity, remove) with strict stock validation.
  - Checkout using Cash on Delivery (collect name, phone, address, city, pincode).
- **SwipeCart Feature:**
  - "Swipe to Shop" view displaying one product at a time.
  - Swipe right (or click "Add to Cart") to add 1 unit to cart.
  - Swipe left (or click "Skip") to skip to the next product.
  - Clearly display out-of-stock messages; prevent adding out-of-stock items.
  - No swipe history or skipped items are saved to the database.
- **Admin Experience:**
  - Admin login and JWT-protected dashboard.
  - Manage Categories (add, view, edit, delete): name, description.
  - Manage Products (add, view, edit, delete): name, description, price, image, category, stock.
  - Manage Orders (view all, view details).
  - Update Order Status (Pending, Confirmed, Shipped, Delivered, Cancelled).

## Boundaries
- Exclude payment gateways, wishlists, reviews, coupons, suppliers, multi-vendor features, advanced analytics.
- No additional database models beyond User, Category, Product, and Order.

## Pages
- **Public/Customer:** Home, Login, Register, Products, Product Details, Swipe to Shop, Cart, Checkout, My Orders.
- **Admin:** Dashboard, Manage Categories, Manage Products, Manage Orders.

## Acceptance Criteria
- User can register, login, and place an order using COD.
- Cart prevents adding more items than available in stock.
- Swipe to Shop works consistently across touch, mouse, and keyboard.
- Admin can securely manage inventory and process orders.
- First admin can be created safely without public admin registration.
