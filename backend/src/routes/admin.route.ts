import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware";
import { createAlbum, createSong, deleteSong, deleteAlbum } from "../controllers/admin.controller";

const router = Router();

router.post("/songs", requireAdmin, createSong);
router.delete("/songs/:id", requireAdmin, deleteSong);

router.post("/albums", requireAdmin, createAlbum);
router.delete("/albums/:id", requireAdmin, deleteAlbum);

export default router;
