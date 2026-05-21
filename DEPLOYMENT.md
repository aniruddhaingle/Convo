# FullStack Chat Application

A real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io.

## Live Deployment

- **Frontend**: [Vercel URL will be here after deployment]
- **Backend**: [Render URL will be here after deployment]

## Tech Stack

- **Frontend**: React 18, Zustand, Socket.io-client, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Socket.io
- **Database**: MongoDB Atlas
- **Image Upload**: Cloudinary
- **Hosting**: Vercel (frontend), Render (backend)

## Features

- ✅ User Authentication (Signup/Login/Logout)
- ✅ Real-time Messaging with Socket.io
- ✅ Online Status Tracking
- ✅ Profile Management & Image Upload
- ✅ Theme Customization
- ✅ Responsive UI with Tailwind CSS

## Quick Start

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FullStack-Chat-Application.git
   cd FullStack-Chat-Application
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your credentials
   npm install
   npm run seed  # Optional: seed sample data
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5001

## Deployment

### Deploy Frontend to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select your repository
4. Select `frontend` as root directory
5. Deploy

### Deploy Backend to Render

1. Go to [render.com](https://render.com)
2. Click "New +" → Select "Web Service"
3. Connect your GitHub repository
4. Set up service with these settings:
   - **Name**: chat-app-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `NODE_ENV`: production
6. Deploy

### Update Frontend API URL

After deploying the backend to Render, update the frontend API endpoint:

**File**: `frontend/src/lib/axios.js`

```javascript
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : "https://your-render-backend-url.onrender.com/api"
```

**File**: `frontend/src/store/useAuthStore.js`

```javascript
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001" 
  : "https://your-render-backend-url.onrender.com"
```

## Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5001
NODE_ENV=production
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check auth status
- `PUT /api/auth/update-profile` - Update profile

### Messages
- `GET /api/messages/users` - Get all users
- `GET /api/messages/:id` - Get messages with user
- `POST /api/messages/send/:id` - Send message

## Database Schema

### User Model
```javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashed),
  profilePic: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  text: String,
  image: String (Cloudinary URL),
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB Atlas credentials
- Check IP whitelist in Atlas dashboard
- Ensure database user has proper permissions

### CORS Errors
- Backend CORS is configured for production deployment
- Update frontend API URL in deployment settings

### Socket.io Connection Issues
- Ensure backend and frontend URLs match
- Check CORS settings in `backend/src/lib/socket.js`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open a GitHub issue.
