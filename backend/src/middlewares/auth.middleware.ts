import { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/express";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth?.userId) {
    res.status(401).json({ message: "Unauthorized - you must be logged in" });
    return;
  }

  next();
};

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized - you must be logged in" });
      return;
    }

    const currentUser = await clerkClient.users.getUser(userId);
    const isAdmin =
      currentUser.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL;
    if (!isAdmin) {
      res.status(403).json({ message: "Unauthorized - you must be an admin" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in requireAdmin middleware",
      error,
    });
    next(error);
  }
};
