import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  editMovie,
  getAllUserMovies,
  getOneMovie,
} from "../controllers/movie";
import validate from "../middlewares/validate";
import { movieSchema } from "../schemas/movie";

const router = Router();

// @desc
// @route   api/movies
// @access  Protected

// router.get("/:movieId", getMovie);
router.post("/", validate(movieSchema), createMovie);
router.get("/", getAllUserMovies);
router.get("/:movieId", getOneMovie);
router.put("/:movieId", editMovie);
router.delete("/:movieId", deleteMovie);

// router.put("/:movieId",  /* validate body middleware  */ editMovie); // check owner
// router.delete('/:movieId', deleteMovie) // check owner

// router.get("/:movieId/comments", getCommentsOfMovie);
// router.post("/:movieId/comments", /* validate body middleware  */  createCommentToMovie);

// router.get("/:movieId/likes", getLikesOfMovie);
// router.post("/:movieId/likes",  /* validate body middleware  */ createLikeToMovie);

export default router;
