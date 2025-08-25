### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```env
   JWT_SECRET=
   PORT=
   MONGO_URI=
   JWT_EXPIRATION=
   BCRYPT_SALT=
   NODE_ENV=
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```env
   REACT_APP_API_URL=
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Start Script

1. Installs dependencies for backend and frontend (if not installed) and Starts both in development mode.
   ```bash
   ./start.sh
   ```

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User authentication

### Users (Protected)
- `GET /users/me` - Get all users

## API Documentation

Once the backend is running, you can access the Swagger documentation at:
`http://localhost:3000/api`




