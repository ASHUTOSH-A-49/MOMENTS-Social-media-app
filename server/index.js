import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// FIX: Add the '/api' prefix to your Express routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
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
