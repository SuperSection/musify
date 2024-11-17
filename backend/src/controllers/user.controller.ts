import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = req.auth?.userId;
    const users = await User.find({ clerkId: { $ne: currentUser } });
    res.status(200).json(users);
  } catch (error) {
    console.log("ERROR: in getAllUsers controller: ", error);
    next(error);
  }
};

export { getAllUsers };
