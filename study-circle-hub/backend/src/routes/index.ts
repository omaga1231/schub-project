import express from 'express';
import userRoutes from './userRoutes';
import courseRoutes from './courseRoutes';
import reviewRoutes from './reviewRoutes';

const router = express.Router();

// Mount routes
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/reviews', reviewRoutes);

export default router;

