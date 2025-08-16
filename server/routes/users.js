import express from 'express';
const router = express.Router();
import { signin, signup } from '../controllers/user.js';
// Correct way to use the controller as the route handler
router.post('/signin', signin);
router.post('/signup', signup);
export default router;