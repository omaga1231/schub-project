import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  course: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  text: string;
  userName: string;
  date: Date;
  isApproved: boolean;
}

const ReviewSchema: Schema = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    userName: {
      type: String,
      required: true
    },
    isApproved: {
      type: Boolean,
      default: true // Set to false if reviews require approval
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model<IReview>('Review', ReviewSchema);

export default Review;

