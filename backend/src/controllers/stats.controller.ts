import { Request, Response, NextFunction } from "express";
import Song from "../models/song.model";
import User from "../models/user.model";
import Album from "../models/album.model";

const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const totalSongs = await Song.countDocuments();
    // const totalUsers = await User.countDocuments();
    // const totalAlbums = await Album.countDocuments();

    /* Optimized approach */
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),

        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    console.log("ERROR: in getStats controller: ", error);
    next(error);
  }
};

export { getStats };
