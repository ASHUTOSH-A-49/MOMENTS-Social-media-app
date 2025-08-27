import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
import path from 'path'; // Missing import
import { fileURLToPath } from 'url'; // Missing import

// Add this line to log when the serverless function starts
console.log("Server: Serverless function starting up.");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Log incoming requests before they hit the routes
app.use((req, res, next) => {
  console.log(`Server: Incoming request - Method: ${req.method}, URL: ${req.url}`);
  next();
});

// Define your API routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// Log when the route handlers are being used
app.use('/users', (req, res, next) => {
  console.log(`Server: Hitting the /users router with method: ${req.method}`);
  next();
});

// In Vercel, the serverless function should not call app.listen()
// We'll export the app directly.
// This is required for Vercel's serverless function to work correctly.
// The code below handles serving your client files
// and should only be present in the Vercel deployment.
if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    app.use(express.static(path.join(__dirname, 'client/dist')));
    
    // Fallback for all other requests to serve the main client HTML file
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

// Export the Express app as the serverless function
export default app;