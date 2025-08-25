# Login Frontend

## Quick Start

Create a `.env` file in the backend directory:

```env
REACT_APP_API_URL=http://localhost:3000
```


### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production

## API Integration

The frontend integrates with the NestJS backend API:

- **POST** `/auth/register` - User registration
- **POST** `/auth/login` - User authentication
- **GET** `/users/profile` - Get user profile (protected)

## Authentication Flow

1. **Registration**: Users create accounts with email, name, and password
2. **Login**: Users authenticate with email and password
3. **Token Storage**: JWT tokens are stored in localStorage
4. **Protected Routes**: Dashboard is only accessible to authenticated users
5. **Logout**: Users can securely log out, clearing stored tokens
