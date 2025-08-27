import express from 'express';
import postRoutes from './posts.js';
import userRoutes from './users.js';

const apiRouter = express.Router();

// Mount your existing routers under a single API router
apiRouter.use('/posts', postRoutes);
apiRouter.use('/users', userRoutes);

export default apiRouter;
