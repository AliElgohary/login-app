# Login API Backend

## Quick Start

Create a `.env` file in the backend directory:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/login
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-32-chars
JWT_EXPIRATION=1d
BCRYPT_SALT=10
```


### Run the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Build the application
npm run build
```

The API will be available at `http://localhost:3000`

## API Documentation

Once the application is running, you can access the interactive API documentation at:

**Swagger UI**: `http://localhost:3000/api`

## API Endpoints

### Public Endpoints

#### POST `/auth/signup`
User registration endpoint.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "SecurePass123!"
}
```

#### POST `/auth/signin`
User login endpoint.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### Protected Endpoints

**Note**: protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```


#### GET `/users/me`
Get current user information with additional metadata.

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Sign up** or **Sign in** to receive a JWT token
2. **Include the token** in the Authorization header for protected endpoints
3. **Token format**: `Bearer <token>`


## Logging
Winston for structured logging