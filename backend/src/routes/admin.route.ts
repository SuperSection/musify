import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", requireAdmin);

export default router;
