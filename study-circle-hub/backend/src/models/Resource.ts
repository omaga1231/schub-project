import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  course: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  type: 'pdf' | 'link' | 'image';
  url: string;
  uploadedBy: string;
  createdAt: Date;
}

const ResourceSchema: Schema = new Schema(
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
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['pdf', 'link', 'image'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    uploadedBy: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Resource = mongoose.model<IResource>('Resource', ResourceSchema);
export default Resource;

