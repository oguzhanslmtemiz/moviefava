import { Router } from "express";
import { createCommentToMovie, getMovieComments } from "../controllers/comment";
import { likeAndUnlikeMovie } from "../controllers/like";
import {
  createMovie,
  deleteMovie,
  editMovie,
  getMyMovie,
  getSharedMovieOfUser,
} from "../controllers/movie";
import { selfAuth } from "../middlewares/auth";
import validate from "../middlewares/validate";
import { commentSchema } from "../schemas/comment";
import { movieSchema } from "../schemas/movie";

const router = Router();

// @desc
// @route   api/movies
// @access  Protected

router.post("/", validate(movieSchema), createMovie);
router.get("/my/:movieId", selfAuth, getMyMovie);
router.get("/:movieId", getSharedMovieOfUser);
router.put("/:movieId", validate(movieSchema), selfAuth, editMovie);
router.delete("/:movieId/", selfAuth, deleteMovie);
router.get("/:movieId/like", likeAndUnlikeMovie);
router.get("/:movieId/comment", getMovieComments);
router.post("/:movieId/comment", validate(commentSchema), createCommentToMovie);

export default router;
