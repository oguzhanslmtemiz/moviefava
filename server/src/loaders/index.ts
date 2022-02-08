import { Application } from "express";
import express from "./express";

export default async (app: Application) => {
  express(app);
};
