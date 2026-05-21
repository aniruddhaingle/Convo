# FullStack Chat Application

A real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io with full-stack deployment.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://your-vercel-url.vercel.app)
- **Backend**: [Deployed on Render](https://your-render-url.onrender.com)

> Update URLs after deployment

## ✨ Features

- ✅ **User Authentication** - Secure signup/login with JWT
- ✅ **Real-Time Messaging** - Instant messaging with Socket.io
- ✅ **Online Status** - See who's online in real-time
- ✅ **Profile Management** - Upload and update profile pictures
- ✅ **Theme Customization** - Multiple DaisyUI themes
- ✅ **Responsive UI** - Mobile-friendly with Tailwind CSS
- ✅ **Input Validation** - Comprehensive form and data validation
- ✅ **Error Handling** - Robust error handling throughout

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Zustand** - State management
- **Socket.io-client** - Real-time communication
- **Tailwind CSS + DaisyUI** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **Socket.io** - Real-time events
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- GitHub account
- Vercel & Render accounts

## 🏃 Quick Start

### Local Development

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/FullStack-Chat-Application.git
   cd FullStack-Chat-Application
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB Atlas & Cloudinary credentials
   npm install
   npm run seed    # Optional: seed sample data
   npm run dev     # Development server
   npm start       # Production server
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev     # Development server runs on http://localhost:5173
   ```

4. **Access Application**
   - Open browser: http://localhost:5173
   - Backend API: http://localhost:5001/api

## 🌐 Deployment

### Quick Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions for:
- Deploying frontend to **Vercel**
- Deploying backend to **Render**
- Setting up **GitHub Actions** CI/CD
- Configuring environment variables

### High-Level Steps

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/FullStack-Chat-Application.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy Frontend to Vercel**
   - Connect GitHub repo to Vercel
   - Set root directory: `frontend`
   - Auto-deploy on push to main

3. **Deploy Backend to Render**
   - Create new Web Service on Render
   - Connect GitHub repo
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables

4. **Update Frontend API URLs**
   - Update `frontend/src/lib/axios.js`
   - Update `frontend/src/store/useAuthStore.js`
   - Replace `localhost:5001` with your Render URL

## 📖 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new account |
| POST | `/api/auth/login` | Login to account |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/check` | Check authentication status |
| PUT | `/api/auth/update-profile` | Update user profile |

### Message Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/users` | Get all users |
| GET | `/api/messages/:id` | Get messages with user |
| POST | `/api/messages/send/:id` | Send message to user |

## 🗄 Database Schema

**User Model**
```javascript
{
  fullName: String (required, min 2 chars),
  email: String (required, unique, lowercase),
  password: String (required, min 6 chars, hashed),
  profilePic: String (default empty),
  createdAt: Date,
  updatedAt: Date
}
```

**Message Model**
```javascript
{
  senderId: ObjectId (ref: User, required),
  receiverId: ObjectId (ref: User, required),
  text: String (max 5000 chars),
  image: String (Cloudinary URL),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
PORT=5001
NODE_ENV=production
JWT_SECRET=your_secure_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
- Configure API URLs in `src/lib/axios.js` and `src/store/useAuthStore.js`

## 🚨 Troubleshooting

### MongoDB Connection Failed
- Verify credentials in MongoDB Atlas
- Check IP whitelist includes your server IP
- Ensure database user has admin privileges

### Socket.io Connection Issues
- Backend and frontend URLs must match
- Check CORS settings
- Verify port 5001 is accessible

### Image Upload Not Working
- Verify Cloudinary credentials
- Check file size limits (max 5MB)
- Ensure image is base64 encoded

## 🔄 CI/CD Pipeline

GitHub Actions automatically:
- Lints code on push
- Builds frontend
- Runs tests
- Deploys to Vercel (frontend)
- Deploys to Render (backend)

See `.github/workflows/ci-cd.yml` for configuration.

## 📝 Available Scripts

### Backend
```bash
npm start       # Production server
npm run dev     # Development with nodemon
npm run seed    # Seed sample data
```

### Frontend
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
npm run lint    # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Future Enhancements

- [ ] Edit and delete messages
- [ ] Message search functionality
- [ ] User search functionality
- [ ] Group chat support
- [ ] File uploads (documents, videos)
- [ ] Message read receipts
- [ ] Typing indicators
- [ ] User blocking
- [ ] End-to-end encryption

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 💬 Support

For issues, questions, or suggestions:
1. Check [existing issues](https://github.com/yourusername/FullStack-Chat-Application/issues)
2. Create a [new issue](https://github.com/yourusername/FullStack-Chat-Application/issues/new)
3. Join our discussions

## 👨‍💻 Author

Created with ❤️ by [Your Name]

---

**Happy Chatting! 🎉**

