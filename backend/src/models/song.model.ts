import mongoose, { Schema, Model, Document } from "mongoose";

// Define the ISong interface
export interface ISong {
  title: string;
  imageUrl: string;
  artist: string;
  audioUrl: string;
  duration: number;
  albumId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Extend ISong with Document for full type safety
interface ISongDocument extends ISong, Document {}

const SongSchema = new Schema<ISongDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: false,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

// Create the Song model
const SongModel: Model<ISongDocument> = mongoose.model<ISongDocument>(
  "Song",
  SongSchema
);

export default SongModel;
