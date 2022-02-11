import { Router } from "express";
import { googleAuth } from "../controllers/auth";

const router = Router();

router.post("/google", googleAuth);

export default router;
