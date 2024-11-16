import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";

import Song from "../models/song.model";
import Album from "../models/album.model";
import { uploadToCloudinary } from "../lib/cloudinary";

const createSong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      res.status(400).json({
        message: "Audio and image files are required",
      });
      return; // Explicitly stop further execution
    }

    const { title, artist, albumId, duration } = req.body;

    const audioFile = req.files.audioFile as UploadedFile;
    const imageFile = req.files.imageFile as UploadedFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = await Song.create({
      title,
      artist,
      imageUrl,
      audioUrl,
      duration,
      albumId: albumId || null,
    });

    // If song belongs to an album, add it to the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json({
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    console.log("ERROR: in createSong controller", error);
    next(error);
  }
};

const deleteSong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    // if song belongs to an album, remove it from the album's songs array
    if (song?.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({
      message: "Song deleted successfully",
    });
  } catch (error) {
    console.log("ERROR: in deleteSong controller", error);
    next(error);
  }
};

const createAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files || !req.files.imageFile) {
      res.status(400).json({
        message: "Image file is required",
      });
      return;
    }

    const { title, artist, releaseYear } = req.body;

    const imageFile = req.files.imageFile as UploadedFile;
    const imageUrl = await uploadToCloudinary(imageFile);

    const album = await Album.create({
      title,
      artist,
      releaseYear,
      imageUrl,
    });

    res.status(201).json({ message: "Album created successfully", album });
  } catch (error) {
    console.log("ERROR: in createAlbum controller", error);
    next(error);
  }
};

const deleteAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: "Album deleted successfully"});
  } catch (error) {
    console.log("ERROR: in deleteAlbum controller", error);
    next(error);
  }
};

export { createSong, deleteSong, createAlbum, deleteAlbum };
