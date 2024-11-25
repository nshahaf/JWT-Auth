//setup
import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDatabase } from './lib/db.js';
import logger from './middleware/logger.js';

//routes
import authRoutes from './api/auth/auth.route.js'
import messageRoutes from './api/message/message.route.js'

dotenv.config()

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(logger)

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

// Start the server and listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase()
});
