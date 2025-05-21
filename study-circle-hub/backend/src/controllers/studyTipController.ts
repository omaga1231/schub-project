import { Request, Response } from 'express';
import StudyTip from '../models/StudyTip';
import Course from '../models/Course';

interface AuthRequest extends Request {
  user?: any;
}

// Get all tips for a course
export const getTips = async (req: Request, res: Response) => {
  try {
    const tips = await StudyTip.find({ course: req.params.courseId })
      .sort({ createdAt: -1 });
    res.json(tips);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching tips", error: error.message });
  }
};

// Add a new tip
export const addTip = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const { text } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const tip = await StudyTip.create({
      course: courseId,
      user: req.user.id,
      text,
      userName: req.user.name,
      likes: 0
    });

    res.status(201).json(tip);
  } catch (error: any) {
    res.status(500).json({ message: "Error adding tip", error: error.message });
  }
};

// Toggle like on a tip
export const toggleLike = async (req: AuthRequest, res: Response) => {
  try {
    const tip = await StudyTip.findById(req.params.tipId);
    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    // Check if the user has already liked the tip
    const userId = req.user.id;
    const alreadyLiked = tip.likes.some((like: any) => like.user == userId);

    if (alreadyLiked) {
      // Unlike the tip
      tip.likes = tip.likes.filter((like: any) => like.user != userId);
    } else {
      // Like the tip
      tip.likes.push({ user: userId });
    }

    await tip.save();
    res.json({ likes: tip.likes.length });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating tip", error: error.message });
  }
};

// Delete a tip
export const deleteTip = async (req: AuthRequest, res: Response) => {
  try {
    const tip = await StudyTip.findById(req.params.tipId);
    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    if (tip.user.toString() !== req.user?.id && !req.user?.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await StudyTip.findByIdAndDelete(req.params.tipId);
    res.json({ message: "Tip deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting tip", error: error.message });
  }
};

