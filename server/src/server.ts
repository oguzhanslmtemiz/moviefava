require("dotenv").config();
import express, { Application } from "express";

async function startServer(): Promise<void> {
  const app: Application = express();

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
