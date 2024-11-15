import mongoose, { Schema, Model, Document } from "mongoose";
import { ISong } from "./song.model";

// Define the IAlbum interface
export interface IAlbum {
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: ISong[];
  createdAt: Date;
  updatedAt: Date;
}

// Extend IAlbum with Document for full type safety
interface IAlbumDocument extends IAlbum, Document {}

const AlbumSchema = new Schema<IAlbumDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { timestamps: true } // createdAt, updatedAt
);

// Create the Album model
const AlbumModel: Model<IAlbumDocument> = mongoose.model<IAlbumDocument>(
  "Album",
  AlbumSchema
);

export default AlbumModel;
