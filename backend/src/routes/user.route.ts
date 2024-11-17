import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { getAllUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", protectRoute, getAllUsers);
// TODO: getMessages route

export default router;
