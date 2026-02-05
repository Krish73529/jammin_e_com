import { Router } from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/category.controller";
import { uploader } from "../middlewares/multer.middleware";

const router = Router();

const upload = uploader();

// get all
router.get("/", getAll);
router.get("/:id", getById);

// create
router.post("/", upload.single("image"), create);

//update
router.put("/:id", upload.single("image"), update);

// delete
router.delete("/:id", remove);

export default router;
