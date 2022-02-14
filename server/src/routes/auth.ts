import { Router } from "express";
import { socialLoginAuth, successfulAuth } from "../controllers/auth";
import { userAuth } from "../middlewares/auth";

const router = Router();

// @desc
// @route   api/auth
// @access  Public

router.get("/", userAuth, successfulAuth);
router.post("/google", socialLoginAuth);
router.post("/facebook", socialLoginAuth);

export default router;
