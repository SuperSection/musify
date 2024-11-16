import { NextFunction, Request, Response } from "express";
import Album from "../models/album.model";

const getAllAlbums = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.log("ERROR: in getAllAlbums controller", error);
    next(error);
  }
};

const getAlbumById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
      res.status(404).json({ message: "Album not found" });
      return;
    }

    res.status(200).json(album);
  } catch (error) {
    console.log("ERROR: in getAlbumById controller", error);
    next(error);
  }
};

export { getAllAlbums, getAlbumById };
