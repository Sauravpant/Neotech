# E-commerce API Documentation

Base URL: `/api/v1`

---

## Authentication

| Endpoint                | Function                  | Method |
| ----------------------- | ------------------------- | ------ |
| `/auth/login`           | User login                | POST   |
| `/auth/register`        | User registration         | POST   |
| `/auth/logout`          | User logout               | POST   |
| `/auth/send-otp`        | Send OTP for verification | POST   |
| `/auth/verify-account`  | Verify user account       | PATCH  |
| `/auth/change-password` | Change user password      | PATCH  |
| `/auth/forgot-password` | Forgot password           | PATCH  |
| `/auth/delete-account`  | Delete user account       | DELETE |
| `/auth/refresh-token`   | Refresh access token      | GET    |

---

## User

| Endpoint                       | Function                 | Method |
| ------------------------------ | ------------------------ | ------ |
| `/user/me`                     | Get current user profile | GET    |
| `/user/upload-profile-picture` | Upload profile picture   | PATCH  |
| `/user/delete-profile-picture` | Delete profile picture   | DELETE |
| `/user/update-profile`         | Update user profile      | PATCH  |
| `/user/deactivate-account`     | Deactivate user account  | PATCH  |

---

## Products

| Endpoint                           | Function                     | Method |
| ---------------------------------- | ---------------------------- | ------ |
| `/product/get-all-products?page=1` | Get all products (paginated) | GET    |
| `/product/{productId}`             | Get product by ID            | GET    |

---

## Cart

| Endpoint                               | Function                | Method |
| -------------------------------------- | ----------------------- | ------ |
| `/cart/add-to-cart/{productId}`        | Add item to cart        | POST   |
| `/cart/increment-quantity/{productId}` | Increment item quantity | PATCH  |
| `/cart/decrement-quantity/{productId}` | Decrement item quantity | PATCH  |
| `/cart/get-cart`                       | Get cart items          | GET    |
| `/cart/remove-item/{productId}`        | Remove item from cart   | PATCH  |
| `/cart/clear-cart`                     | Clear cart              | DELETE |

---

## Wishlist

| Endpoint                                     | Function                  | Method |
| -------------------------------------------- | ------------------------- | ------ |
| `/wishlist/add-to-wishlist/{productId}`      | Add item to wishlist      | POST   |
| `/wishlist/get-wishlist`                     | Get wishlist items        | GET    |
| `/wishlist/remove-from-wishlist/{productId}` | Remove item from wishlist | PATCH  |
| `/wishlist/clear-wishlist`                   | Clear wishlist            | DELETE |

---

## Orders

| Endpoint                  | Function                        | Method |
| ------------------------- | ------------------------------- | ------ |
| `/order/checkout`         | Create order (checkout)         | POST   |
| `/order/my-orders`        | Get all orders for current user | GET    |
| `/order/get/{orderId}`    | Get order by ID                 | GET    |
| `/order/cancel/{orderId}` | Cancel order                    | PATCH  |

---

## Reviews

| Endpoint                            | Function                  | Method |
| ----------------------------------- | ------------------------- | ------ |
| `/review/get-my-reviews`            | Get my reviews            | GET    |
| `/review/create-review/{productId}` | Create review for product | POST   |
| `/review/update-review/{reviewId}`  | Update review             | PATCH  |
| `/review/delete-review/{reviewId}`  | Delete review             | DELETE |

---

## Categories

| Endpoint                       | Function           | Method |
| ------------------------------ | ------------------ | ------ |
| `/category/get-all-categories` | Get all categories | GET    |

---

## Reports

| Endpoint                             | Function         | Method |
| ------------------------------------ | ---------------- | ------ |
| `/report/report-product/{productId}` | Report a product | POST   |
| `/report/my-reports`                 | Get my reports   | GET    |
| `/report/delete-report/{reportId}`   | Delete report    | DELETE |

## Admin Endpoints

### User Management

| Endpoint                           | Function            | Method |
| ---------------------------------- | ------------------- | ------ |
| `/admin/user/all-users`            | Get all users       | GET    |
| `/admin/user/get-user/{userId}`    | Get user by ID      | GET    |
| `/admin/user/delete-user/{userId}` | Delete user         | DELETE |
| `/admin/user/get-stats`            | Get user statistics | GET    |

### Product Management

| Endpoint                                    | Function       | Method |
| ------------------------------------------- | -------------- | ------ |
| `/admin/product/add-product`                | Add product    | POST   |
| `/admin/product/update-product/{productId}` | Update product | PATCH  |
| `/admin/product/delete-product/{productId}` | Delete product | DELETE |

### Category Management

| Endpoint                                       | Function                   | Method |
| ---------------------------------------------- | -------------------------- | ------ |
| `/admin/category/add-category`                 | Add category               | POST   |
| `/admin/category/update-category/{categoryId}` | Update category            | PATCH  |
| `/admin/category/get-all-categories`           | Get all categories (admin) | GET    |
| `/admin/category/get-category/{categoryId}`    | Get category by ID         | GET    |
| `/admin/category/delete-category/{categoryId}` | Delete category            | DELETE |

### Orders Management

| Endpoint                              | Function             | Method |
| ------------------------------------- | -------------------- | ------ |
| `/admin/order/get-all-orders`         | Get all orders       | GET    |
| `/admin/order/delete-order/{orderId}` | Delete order         | DELETE |
| `/admin/order/update-order/{orderId}` | Update order status  | PATCH  |
| `/admin/order/get-order-stats`        | Get order statistics | GET    |

### Review Management

| Endpoint                                 | Function              | Method |
| ---------------------------------------- | --------------------- | ------ |
| `/admin/review/get-all-reviews`          | Get all reviews       | GET    |
| `/admin/review/delete-review/{reviewId}` | Delete review (admin) | DELETE |

### Reports Management

| Endpoint                                 | Function              | Method |
| ---------------------------------------- | --------------------- | ------ |
| `/admin/report/get-all-reports`          | Get all reports       | GET    |
| `/admin/report/delete-report/{reportId}` | Delete report (admin) | DELETE |

---


