import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "../routes";

export default (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_ORIGIN,
      methods: ["GET", "HEAD", "PUT", "POST", "PATCH", "DELETE", "UPDATE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // Routes
  app.use(routes);
};
