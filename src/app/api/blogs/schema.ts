import mongoose, { Schema, Document } from "mongoose";
import db from "../db";

interface IBlogPost extends Document {
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  tags: string[];
}

const blogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    required: false,
  },
  tags: {
    type: [String],
    default: [],
  },
});
function bgModel(){
  return db.models.blogs||db.model<IBlogPost>("blogs", blogPostSchema);
}
const BlogPostModel = bgModel();
export default BlogPostModel;

