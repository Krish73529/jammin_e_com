import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
} from "../controllers/brand.controller";
import { uploader } from "../middlewares/multer.middleware";

const router = express.Router();

const upload = uploader();

// get all
router.get("/", getAll);

// get by id
router.get("/:id", getById);

// create
router.post("/", upload.single("logo"), create);

//delete
router.delete("/:id", remove);

export default router;
