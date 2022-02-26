import { Router } from "express";
import {
  createActor,
  deleteActor,
  editActor,
  getMyActor,
  getSharedActorOfUser,
} from "../controllers/actor";
import { createCommentToActor, getActorComments } from "../controllers/comment";
import { likeAndUnlikeActor } from "../controllers/like";
import { selfAuth } from "../middlewares/auth";
import validate from "../middlewares/validate";
import { actorSchema } from "../schemas/actor";
import { commentSchema } from "../schemas/comment";

const router = Router();

// @desc
// @route   api/actors
// @access  Protected

router.post("/", validate(actorSchema), createActor);
router.get("/my/:actorId", selfAuth, getMyActor);
router.get("/:actorId", getSharedActorOfUser);
router.put("/:actorId", validate(actorSchema), selfAuth, editActor);
router.delete("/:actorId/", selfAuth, deleteActor);
router.get("/:actorId/like", likeAndUnlikeActor);
router.get("/:actorId/comment", getActorComments);
router.post("/:actorId/comment", validate(commentSchema), createCommentToActor);

export default router;
