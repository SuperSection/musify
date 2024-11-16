import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware";
import { createSong } from "../controllers/admin.controller";

const router = Router();

router.post("/songs", requireAdmin, createSong);

export default router;
