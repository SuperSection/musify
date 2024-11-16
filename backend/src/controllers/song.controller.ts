import { Request, Response, NextFunction } from "express";
import Song from "../models/song.model";

const getAllSongs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // sort songs by 'createdAt' in descending order
    // -1 is for descending order => most recent songs first
    // 1 is for ascending order => oldest songs first
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    console.log("ERROR: in getAllSongs controller", error);
    next(error);
  }
};

const getFeaturedSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // fetch 6 random songs using mongoose's aggregate method
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 0,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log("ERROR: in getFeaturedSongs controller", error);
    next(error);
  }
};

const getMadeForYouSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // fetch 6 random songs using mongoose's aggregate method
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 0,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log("ERROR: in getMadeForYouSongs controller", error);
    next(error);
  }
};

const getTrendingSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // fetch 6 random songs using mongoose's aggregate method
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 0,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log("ERROR: in getTrendingSongs controller", error);
    next(error);
  }
};

export { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs };
