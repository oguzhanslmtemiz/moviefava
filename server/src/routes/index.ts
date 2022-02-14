import { Router } from "express";

import loginRoute from "./login";
import registerRoute from "./register";
import authRoute from "./auth";
import userRoute from "./users";
import { userAuth } from "../middlewares/auth";
import movieRoute from "./movies";
import actorRoute from "./actors";
import timelineRoute from "./timeline";

const router = Router();

router.use("/login", loginRoute);
router.use("/register", registerRoute);
router.use("/auth", authRoute);
router.use("/users", userAuth, userRoute);
router.use("/movies", userAuth, movieRoute);
router.use("/actors", userAuth, actorRoute);
router.use("/timeline", userAuth, timelineRoute);

export default router;
