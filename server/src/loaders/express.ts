import express, { Application } from "express";
import { loginRoute, registerRoute } from "../routes";

export default (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/login", loginRoute);
  app.use("/register", registerRoute);
};
