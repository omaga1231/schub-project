import mongoose from 'mongoose';

export interface ICourse extends mongoose.Document {
  name: string;
  code: string;
  description: string;
  college: string;
  professor: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  reviews: IReview[];
  rating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  rating: number;
  text: string;
}

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a course name']
    },
    code: {
      type: String,
      required: [true, 'Please provide a course code'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Please provide a course description']
    },
    college: {
      type: String,
      required: [true, 'Please provide the college/university']
    },
    professor: {
      type: String,
      required: [true, 'Please provide the professor name']
    },
    difficulty: {
      type: String,
      required: [true, 'Please provide the difficulty level'],
      enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;

