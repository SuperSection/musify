import mongoose, { Model, Schema, Document } from "mongoose";

// Define the IUser interface
interface IUser {
  fullName: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Extend IUser with Document for full type safety
interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Define the model
const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  UserSchema
);

export default UserModel;
