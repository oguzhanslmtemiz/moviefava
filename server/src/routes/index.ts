import { Router } from "express";

import loginRoute from "./login";
import registerRoute from "./register";
import authRoute from "./auth";

const router = Router();

router.use("/login", loginRoute);
router.use("/register", registerRoute);
router.use("/auth", authRoute);

export default router;
