import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
}

const userSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    min: 8,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verifyCode: {
    type: String,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
},{timestamps:true});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;
