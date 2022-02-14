import { Router } from "express";
import { getMyProfileWithPosts, getUserProfileWithPosts } from "../controllers/user";

const router = Router();

// @desc
// @route   api/users
// @access  Protected

router.get("/me", getMyProfileWithPosts);
router.get("/:userId", getUserProfileWithPosts);

// router.get("/:userId/movies", getUserMovies);    // only shared // extra feature
// router.get("/:userId/actors", getUserActors);    // only shared // extra feature

export default router;
