# JWT Auth Project

This is a project showcasing the use of JWT tokens for authentication. The project includes both a frontend and a backend, utilizing various technologies such as React, Tailwind CSS, bcrypt, JWT, and more.

## Features
- User authentication with JWT tokens
- User signup, login, and logout
- Profile picture upload using Cloudinary
- Protected routes
- Error handling
- State management with Zustand
- Formik and Yup for form validation

## Technologies Used

- **Frontend:**
  - React
  - Tailwind CSS
  - Axios
  - React Router
  - Zustand
  - Formik
  - Yup
  - DaisyUI

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT (jsonwebtoken)
  - bcrypt
  - Cloudinary
  - Chalk
  - Cookie-parser
  - CORS
  - Dotenv
  - Nodemon

## Backend Project Structure
```
backend/ 
├── logs 
├── node_modules 
├── src/
│ ├── api/  
│ ├── lib/ 
│ ├── middleware/ 
│ ├── models/ 
│ ├── tests/ 
│ ├── utils/ 
│ └── server.js
├── .env 
├── package.json 
```
## Frontend Project Structure
```
frontend/ 
├── node_modules/ 
├── public/ 
├── src/ 
│ ├── App.jsx 
│ ├── assets/ 
│ ├── components/  
│ ├── hooks/ 
│ ├── lib/ 
│ ├── pages/ 
│ ├── store/ 
│ ├── authStore.js 
│ ├── index.css 
│ └── main.jsx 
├── index.html 
├── package.json 
├── tailwind.config.js 
├── eslint.config.js 
├── postcss.config.js  
└── vite.config.js
```
## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

```sh
# 1. Clone the repository:
git clone https://github.com/yourusername/ChatApp.git
cd ChatApp

# 2. Install dependencies:
cd backend
npm install
cd ../frontend
npm install

# 3. create .env file in the backend directory and add the following variables:
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173

# 4. Start the backend server:
cd backend
npm run dev

# 5. Start the frontend server:
cd frontend
npm run dev
```


