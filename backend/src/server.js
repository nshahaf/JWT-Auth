//setup
import express from 'express';
import dotenv from 'dotenv'
import { connectDatabase } from './lib/db.js';

//routes
import authRoutes from './api/auth/auth.route.js'

dotenv.config()

const app = express();
app.use(express.json())

app.use("/api/auth", authRoutes)

// Start the server and listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase()
});
