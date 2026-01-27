import "dotenv/config";
import express, { Request, Response } from "express";
import { connectDb } from "./config/db.config";
import { ENV_CONFIG } from "./config/env.config";

const app = express();
const PORT = ENV_CONFIG.port || 8000;

//! connect to database
connectDb();

//! using middlewares

//! root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running!!!",
  });
});

//!using routes
//!listen

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("press ctrl+c p close the server");
});
