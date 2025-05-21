import { Request, Response } from 'express';
import Resource from '../models/Resource';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

interface AuthRequest extends Request {
  user?: any;
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and images are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export const getResources = async (req: Request, res: Response) => {
  try {
    const resources = await Resource.find({ course: req.params.courseId })
      .sort({ createdAt: -1 });
    res.json(resources);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching resources", error: error.message });
  }
};

export const addResource = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const { title, type, url } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    let resourceUrl = url;
    if (req.file) {
      resourceUrl = `/uploads/${req.file.filename}`;
    }

    const resource = await Resource.create({
      course: courseId,
      user: req.user.id,
      title,
      type,
      url: resourceUrl,
      uploadedBy: req.user.name
    });

    res.status(201).json(resource);
  } catch (error: any) {
    res.status(500).json({ message: "Error adding resource", error: error.message });
  }
};

export const deleteResource = async (req: AuthRequest, res: Response) => {
  try {
    const resource = await Resource.findById(req.params.resourceId);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (resource.user.toString() !== req.user?.id && !req.user?.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete file if it's stored locally
    if (resource.url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../../', resource.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Resource.findByIdAndDelete(req.params.resourceId);
    res.json({ message: "Resource deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting resource", error: error.message });
  }
};

