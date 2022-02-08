require("dotenv").config();
import express, { Application } from "express";
import loaders from "./loaders";

async function startServer(): Promise<void> {
  const app: Application = express();

  await loaders(app);

  const PORT: number = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    try {
      console.log(`
        #####################################
        🏁  Server listening on port: ${PORT} 🏁 
        #####################################`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  });
}

startServer();
