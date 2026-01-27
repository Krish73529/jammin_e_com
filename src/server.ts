import "dotenv/config";
import express, { Request, Response } from "express";
import { connectDb } from "./config/db.config";
import { ENV_CONFIG } from "./config/env.config";

//!importing routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

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

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//!listen

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("press ctrl+c p close the server");
});
