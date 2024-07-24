import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  spaces: mongoose.Schema.Types.ObjectId[];
}

const userSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique:true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    minlength: 8,
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
  spaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
  ],
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);
export default UserModel;
