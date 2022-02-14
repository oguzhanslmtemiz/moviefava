import { Router } from "express";
import { createActor } from "../controllers/actor";
import validate from "../middlewares/validate";
import { actorSchema } from "../schemas/actor";

const router = Router();

// @desc
// @route   api/actors
// @access  Protected

router.post("/", validate(actorSchema), createActor);

export default router;
