import { Router } from "express";
import { getMyProfileWithPosts, getUserProfileWithSharedPosts } from "../controllers/user";

const router = Router();

// @desc
// @route   api/users
// @access  Protected

router.get("/me", getMyProfileWithPosts);
router.get("/:userId", getUserProfileWithSharedPosts);

export default router;
