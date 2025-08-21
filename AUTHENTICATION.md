# Authentication Middleware Documentation

This booking service now includes JWT-based authentication middleware to secure API endpoints.

## Setup

1. **Environment Variables**: Add the following to your `.env` file:

    ```
    JWT_SECRET=your-secret-key-here
    ```

2. **Dependencies**: The service uses `jsonwebtoken` for JWT handling.

## Authentication Middleware Types

### 1. `authenticateToken`

-   **Purpose**: Basic token verification
-   **Usage**: Protects routes that require authentication
-   **Behavior**: Verifies JWT token and adds user data to `req.user`

### 2. `authenticateUser`

-   **Purpose**: Token verification with user ownership validation
-   **Usage**: Protects routes where users can only access their own data
-   **Behavior**: Verifies JWT token and ensures users can only access their own resources

### 3. `optionalAuth`

-   **Purpose**: Optional token verification
-   **Usage**: Routes that work with or without authentication
-   **Behavior**: Adds user data to `req.user` if token is valid, otherwise sets `req.user = null`

## Protected Routes

### Booking Routes

-   `POST /booking/booking` - Create booking (uses authenticated user's ID)
-   `DELETE /booking/booking/:id` - Delete booking
-   `GET /booking/booking` - Get all bookings
-   `GET /booking/booking/:id` - Get booking by ID
-   `GET /booking/booking/user/:user_id` - Get bookings by user ID (user ownership validation)
-   `PATCH /booking/booking/:id/user_id` - Update booking user ID (user ownership validation)

### Booking Flight Routes

-   All booking flight routes are protected with `authenticateToken`

## How to Use

### 1. Generate a Test Token

For development/testing, use the test token endpoint:

```bash
POST /booking/auth/test-token
Content-Type: application/json

{
  "user_id": 123,
  "email": "user@example.com",
  "role": "user"
}
```

Response:

```json
{
    "success": true,
    "message": "Token generated successfully",
    "status": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "user_id": 123,
            "email": "user@example.com",
            "role": "user"
        }
    }
}
```

### 2. Use the Token in API Requests

Include the token in the Authorization header:

```bash
GET /booking/booking/user/123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Create a Booking

The booking creation now automatically uses the authenticated user's ID:

```bash
POST /booking/booking
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  // No need to include user_id in body - it's taken from the token
}
```

## Error Responses

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Access token is required",
    "status": 401
}
```

### 403 Forbidden

```json
{
    "success": false,
    "message": "Invalid or expired token",
    "status": 403
}
```

Or for user ownership validation:

```json
{
    "success": false,
    "message": "Access denied. You can only access your own data.",
    "status": 403
}
```

## Security Notes

1. **JWT Secret**: Always use a strong, unique secret key in production
2. **Token Expiration**: Tokens expire after 24 hours
3. **HTTPS**: Always use HTTPS in production
4. **Token Storage**: Store tokens securely on the client side
5. **Token Refresh**: Implement token refresh mechanism for production use

## Production Considerations

1. Remove or secure the `/auth/test-token` endpoint in production
2. Implement proper user authentication system
3. Add rate limiting
4. Implement token refresh mechanism
5. Add logging for authentication events
6. Consider using refresh tokens for better security
