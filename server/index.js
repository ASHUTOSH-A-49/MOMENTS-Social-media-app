import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/posts.js'

const app = express();



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts',postRoutes) //it means that every route inside postRoutes will be starting with /posts - http://localhost:5000/posts

// Store this in .env later
const CONNECTION_URL = 'mongodb+srv://ashumongo66:AshuMongo66@cluster0.twhtqy.mongodb.net/';
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
