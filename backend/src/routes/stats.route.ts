import { Router } from "express";
import { getStats } from "../controllers/stats.controller";
import { requireAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", requireAdmin, getStats);

export default router;
