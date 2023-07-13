import mongoose, { Schema, Document } from "mongoose";
import db from "../db";

interface IBlogPost extends Document {
  title: string;
  content: string;
  coverImage: string;
  author: string;
  likes: number;
  comments: number;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  tags: string[];
  state: 'Published'|'Draft';
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
  coverImage:{
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    default: "",
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
  state: {
    type: String,
    default: 'Draft'
  }
});
function bgModel(){
  return db.models.blogs||db.model<IBlogPost>("blogs", blogPostSchema);
}
const BlogPostModel = bgModel();
export default BlogPostModel;

