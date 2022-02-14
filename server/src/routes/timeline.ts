import { Router } from "express";
import { getSharedPosts } from "../controllers/timeline";

const router = Router();

// @desc
// @route   api/timeline
// @access  Protected

router.get("/", getSharedPosts);

export default router;
