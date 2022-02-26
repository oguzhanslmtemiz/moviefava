import { Request, Response } from "express";
import Boom from "@hapi/boom";
import { errorHandler } from "../utils/helper";
import { TokenPayload } from "../interfaces/User";
import { getUserPosts, getUserSharedPosts } from "../services/user";

export const getMyProfileWithPosts = async (req: Request, res: Response) => {
  try {
    const decodedToken = res.locals.user as TokenPayload;
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

export const getUserProfileWithSharedPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await getUserSharedPosts(parseInt(userId));
    res.status(200).send({
      success: true,
      message: "User profile has been successfully submitted",
      data: posts,
    });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};
