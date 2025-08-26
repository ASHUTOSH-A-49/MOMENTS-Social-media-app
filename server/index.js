import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// All API routes are now handled here, with Vercel routing
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

console.log('User routes loaded successfully!');

// Deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
} else {
  // This route is for local development without the '/api' prefix
  app.get('/', (req, res) => {
    res.send('Hello to Moments API');
  });
}

const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Async connection function
const startServer = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on PORT ${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); 
  }
};

startServer();