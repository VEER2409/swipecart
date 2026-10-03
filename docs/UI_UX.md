# UI / UX Design

## General Aesthetics
- Professional, clean design using Tailwind CSS.
- Original branding (do not use Flipkart logos/colors).
- Responsive layouts (Mobile, Tablet, Desktop).
- Loading spinners and empty states for lists/cart.
- Toast notifications for success/error actions.
- Confirmation dialogs for destructive actions (e.g., deleting a product).

## Pages & Navigation
- **Navbar:** Logo, Search Bar, Categories Dropdown, Cart Icon (with badge), Login/Logout/Profile/Admin links based on state.
- **Home:** Hero section, Featured Categories, Swipe to Shop banner, Popular Products grid.
- **Product Grid:** Responsive grid cards (Image, Name, Category, Price, Stock status, Add to Cart).
- **Product Details:** Large image, full description, price, stock, Add to Cart with quantity selector.
- **Cart & Checkout:** Clear summary of items, total cost, and a multi-step or clean single-page checkout form for address details.
- **Admin Dashboard:** Sidebar navigation (Categories, Products, Orders), tabular data views with pagination or infinite scroll.

## SwipeCart Feature
- **View:** Full-screen or large centered card showing one product at a time.
- **Gestures:**
  - Swipe Right: Add 1 unit to cart (shows success animation).
  - Swipe Left: Skip to the next product (slides out).
- **Accessibility/Alternatives:** Prominent "Add to Cart" and "Skip" buttons below the card for mouse/keyboard users.
- **Stock Rules:** Out-of-stock items show a disabled state and cannot be swiped right.
- **Accidental Swipes:** Ensure clicking the product image opens Product Details without triggering a swipe.
