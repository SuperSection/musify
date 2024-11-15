import mongoose, { Schema, Model, Document } from "mongoose";

// Define the IMessage interface
export interface IMessage {
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Extend IMessage with Document for full type safety
interface IMessageDocument extends IMessage, Document {}

const MessageSchema = new Schema<IMessageDocument>(
  {
    senderId: {
      type: String, // Clerk ID
      required: true,
    },
    receiverId: {
      type: String, // Clerk ID
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

// Create the Message model
const MessageModel: Model<IMessageDocument> = mongoose.model<IMessageDocument>(
  "Message",
  MessageSchema
);

export default MessageModel;
