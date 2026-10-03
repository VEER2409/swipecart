# Implementation Plan

## Phase 1: Repository Setup
- Initialize client (Vite) and server (Express).
- Configure ESLint, Prettier, and basic file structure.
- Define environment variables (`.env.example`).
- Create GitHub Issues based on `TEAM_TASKS.md`.

## Phase 2: Backend Foundation
- Connect to MongoDB.
- Implement User model, auth routes, and first-admin script.
- Implement Models: Category, Product, Order.
- Implement CRUD routes for Category and Product.

## Phase 3: Frontend Foundation
- Setup React Router, Tailwind CSS, and Axios.
- Create basic layout (Navbar, Footer).
- Implement Auth context/state and login/register pages.

## Phase 4: Customer Features & SwipeCart
- Implement Products page, Search, and Category filtering.
- Implement Product Details page.
- Implement Cart state and UI.
- Implement Checkout page and Order submission API (with stock check).
- Build the "Swipe to Shop" feature with touch/mouse support.

## Phase 5: Admin Features
- Implement Admin Dashboard layout.
- Implement Category and Product management UI.
- Implement Order management UI and status updates.

## Phase 6: Polish & Demo Prep
- End-to-end testing of the complete flow.
- Add loading spinners, error boundaries, and toast notifications.
- Final visual polish.

## Manual Demo Checklist
- [ ] Run `createAdmin.js` to seed admin.
- [ ] Admin logs in, creates a Category and a Product (stock > 0).
- [ ] Customer registers and logs in.
- [ ] Customer views products, filters by category.
- [ ] Customer uses "Swipe to Shop" to add an item.
- [ ] Customer proceeds to Checkout, enters address, and places COD order.
- [ ] Customer views the order in "My Orders".
- [ ] Admin logs in, sees the order, and updates status to "Shipped".
