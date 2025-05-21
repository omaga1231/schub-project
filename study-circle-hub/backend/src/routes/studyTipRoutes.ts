import express from 'express';
import { getTips, addTip, toggleLike, deleteTip } from '../controllers/studyTipController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/course/:courseId', getTips);
router.post('/course/:courseId', protect, addTip);
router.post('/:tipId/like', protect, toggleLike);
router.delete('/:tipId', protect, deleteTip);

export default router;

