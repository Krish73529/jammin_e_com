import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { connectDb } from "./config/db.config";
import { ENV_CONFIG } from "./config/env.config";
import AppError, { errorHandler } from "./middlewares/error_handler.middleware";
//!importing routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { ERROR_CODES } from "./types/enum.types";

const app = express();
const PORT = ENV_CONFIG.port || 8000;

//! connect to database
connectDb();

//! using middlewares
app.use(express.json({ limit: "10mb" }));

//! root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running!!!",
  });
});

//!using routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//!path not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `cannot ${req.method} on ${req.url}`;
  const error = new AppError(message, ERROR_CODES.NOT_FOUND_ERR, 404);
  next(error);
});

//!listen

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("press ctrl+c p close the server");
});
