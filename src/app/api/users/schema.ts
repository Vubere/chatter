import mongoose, { Schema, Document } from "mongoose";
import db from "../db";
import {User} from '@/types'

interface IUser extends Document, User {}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  profession: {
    type: String,
    required: true,
  },
  followers: {
    type: [String],
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  notifications: {
    type: [String],
    default: [],
  },
  bookmarks: {
    type: [String],
    default: [],
  },
  posts: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
});

function userModel() {
  return db.models.users || db.model<IUser>("users", userSchema);
}
const UserModel = userModel();

export default UserModel;
