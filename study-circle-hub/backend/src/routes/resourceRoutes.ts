import express from 'express';
import { getResources, addResource, deleteResource, upload } from '../controllers/resourceController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/course/:courseId', getResources);
router.post('/course/:courseId', protect, upload.single('file'), addResource);
router.delete('/:resourceId', protect, deleteResource);

export default router;

