import { Request, Response } from "express";
import UserModel from "../models/user.model";

const authCallback = async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // Check if the user already exists
    const user = await UserModel.findOne({ clerkId: id });

    if (!user) {
      // sign up
      await UserModel.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      res.status(201).json({ status: "User registered successfully" });
    }

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log("Error in auth callback", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { authCallback };
