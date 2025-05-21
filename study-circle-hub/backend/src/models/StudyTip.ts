import mongoose, { Schema, Document } from 'mongoose';

export interface IStudyTip extends Document {
  course: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  text: string;
  userName: string;
  likes: [{ user: mongoose.Schema.Types.ObjectId, ref: 'User' }]; // likes array
  createdAt: Date;
}

const StudyTipSchema: Schema = new Schema(
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
    text: {
      type: String,
      required: true,
      trim: true
    },
    userName: {
      type: String,
      required: true
    },
    likes: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    }]
  },
  {
    timestamps: true
  }
);

const StudyTip = mongoose.model<IStudyTip>('StudyTip', StudyTipSchema);
export default StudyTip;
