import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

const authCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // sign up
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      res.status(201).json({ status: "User registered successfully" });
    }

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};

export { authCallback };
