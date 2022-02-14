import { Router } from "express";
import { getUserByEmail } from "../controllers/login";
import validate from "../middlewares/validate";
import { loginSchema } from "../schemas/user";

const router = Router();

// @desc
// @route   api/login
// @access  Public

router.post("/", validate(loginSchema), getUserByEmail);

export default router;
