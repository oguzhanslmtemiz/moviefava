import { Router } from "express";
import { createUser } from "../controllers/register";

const router = Router();

router.post("/", createUser);

export default router;
