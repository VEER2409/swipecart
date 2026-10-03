# Architecture

## Client/Server Responsibilities
- **Client (React):** Handles UI rendering, user interactions, routing, client-side validation, and state management (e.g., cart state). Communicates with the server via REST APIs using Axios.
- **Server (Node.js/Express):** Handles business logic, data validation, authentication/authorization, and database interactions. Serves JSON responses.

## Data Flow
1. Client makes HTTP requests to REST endpoints.
2. Server validates the request, verifies JWT if needed, and checks permissions.
3. Server interacts with MongoDB using Mongoose.
4. Server returns JSON data or error messages.
5. Client updates UI state based on the response.

## Authentication
- Users authenticate via `/api/auth/login` to receive a JWT.
- JWT is stored in HTTP-only cookies or local storage (to be decided in implementation).
- Admin routes require a JWT with an `isAdmin` flag or equivalent role.
- Passwords are hashed using bcrypt before saving to the database.

## Cart Behavior & Checkout
- Cart is stored client-side (e.g., Context API or local storage).
- Cart quantities cannot exceed the known stock on the client.
- **Checkout:** The client sends the cart items to the server.
- The server *never* trusts client prices. It fetches current prices and stock from MongoDB.
- **Order & Stock Handling:**
  - Server verifies sufficient stock for all items.
  - If valid, the server atomically reduces stock and creates the Order.
  - If stock is insufficient, the transaction fails and returns an error.
  - The order stores snapshots of product details (name, price) at the time of purchase.
  - The client clears its cart only after a successful 201 response.
