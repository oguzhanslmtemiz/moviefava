import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  try {
    res.send(req.body);
  } catch (error) {
    res.send(error);
  }
};
