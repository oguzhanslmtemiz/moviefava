import { Request, Response } from "express";
import Boom from "@hapi/boom";
import { errorHandler } from "../utils/helper";
import { TokenPayload } from "../interfaces/User";
import { getUserPosts } from "../services/user";

export const getMyProfileWithPosts = async (req: Request, res: Response) => {
  try {
    const decodedToken = res.locals.user as TokenPayload;
    // find user in db and send user all movies and actors with likes
    // and comment count, not comment // GET ALL MOVIES and ACTORS

    // There is no possibility that there is no user in the database

    const posts = await getUserPosts(decodedToken.id);
    res.status(200).send({
      success: true,
      message: "Your profile has been successfully submitted",
      data: posts,
    });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const getUserProfileWithPosts = async (req: Request, res: Response) => {
  try {
    // const decodedToken = res.locals.user as TokenPayload;
    // user who visit this profile / visit count / who visit

    const { userId } = req.params;
    const posts = await getUserPosts(parseInt(userId));
    res.status(200).send({
      success: true,
      message: "User profile has been successfully submitted",
      data: posts,
    });

    // use userId to find user in db and send user all movies and actors with likes
    // and comment count, not comment // GET ONLY SHARED MOVIES and ACTORS

    //if user not found in db then response not found
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};
