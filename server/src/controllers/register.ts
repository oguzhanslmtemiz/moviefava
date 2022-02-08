import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    res.send(req.body);
  } catch (error) {
    res.send(error);
  }
};
