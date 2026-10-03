# Data Models

Only four models are used in this project.

## User
- `_id`: ObjectId
- `name`: String, required
- `email`: String, required, unique
- `password`: String, required (hashed)
- `role`: String, enum ['customer', 'admin'], default 'customer'
- `createdAt`: Date
- `updatedAt`: Date

## Category
- `_id`: ObjectId
- `name`: String, required, unique
- `slug`: String, required, unique
- `description`: String
- `createdAt`: Date
- `updatedAt`: Date

## Product
- `_id`: ObjectId
- `name`: String, required
- `description`: String, required
- `price`: Number, required, minimum 0
- `image`: String, required (URL)
- `category`: ObjectId (ref: 'Category'), required
- `stock`: Number, required, minimum 0, integer
- `createdAt`: Date
- `updatedAt`: Date

## Order
- `_id`: ObjectId
- `user`: ObjectId (ref: 'User'), required
- `items`: Array of Objects (Order Item Snapshots)
  - `product`: ObjectId (ref: 'Product')
  - `name`: String (snapshot)
  - `price`: Number (snapshot)
  - `quantity`: Number, required, minimum 1
- `totalAmount`: Number, required
- `shippingAddress`: Object
  - `name`: String
  - `phone`: String
  - `address`: String
  - `city`: String
  - `pincode`: String
- `status`: String, enum ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], default 'Pending'
- `createdAt`: Date
- `updatedAt`: Date
