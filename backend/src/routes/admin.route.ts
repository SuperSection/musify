import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware";
import { createAlbum, createSong, deleteSong, deleteAlbum, checkAdmin } from "../controllers/admin.controller";

const router = Router();

// all routes are protected by the requireAdmin middleware
router.use(requireAdmin);

// returns `admin:true` if the user is an admin
router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
