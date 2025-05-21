import { Request, Response } from 'express';
import Review from '../models/Review';
import Course from '../models/Course';

// Custom interface for authenticated request
interface AuthRequest extends Request {
  user?: any;
}

// Get all reviews for a specific course
export const getReviews = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;
    const reviews = await Review.find({ course: courseId, isApproved: true })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

// Add a new review
export const addReview = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const { rating, text } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const userId = req.user.id;

    const review = await Review.create({
      course: courseId,
      user: userId,
      rating,
      text,
      userName: req.user.name,
      isApproved: true
    });

    // Update course average rating
    const courseReviews = await Review.find({ course: courseId, isApproved: true });
    const avgRating = courseReviews.reduce((acc, rev) => acc + rev.rating, 0) / courseReviews.length;

    await Course.findByIdAndUpdate(courseId, {
      $set: { rating: avgRating },
      $inc: { reviewCount: 1 }
    });

    res.status(201).json(review);
  } catch (error: any) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Check if user owns review or is admin
    if (review.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Review.findByIdAndDelete(req.params.reviewId);
    
    // Update course average rating after deletion
    const courseId = review.course;
    const courseReviews = await Review.find({ course: courseId, isApproved: true });
    
    if (courseReviews.length > 0) {
      const avgRating = courseReviews.reduce((acc, rev) => acc + rev.rating, 0) / courseReviews.length;
      await Course.findByIdAndUpdate(courseId, {
        $set: { rating: avgRating },
        $inc: { reviewCount: -1 }
      });
    } else {
      // No reviews left
      await Course.findByIdAndUpdate(courseId, {
        $set: { rating: 0 },
        $set: { reviewCount: 0 }
      });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
};

