import express from 'express';
import { getReviews, addReview, deleteReview } from '../controllers/reviewController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Route to get all reviews for a specific course
router.get('/course/:courseId', getReviews);

// Route to add a review to a specific course (requires authentication)
router.post('/course/:courseId', protect, addReview);

// Route to delete a specific review (requires authentication)
router.delete('/:reviewId', protect, deleteReview);

export default router;

