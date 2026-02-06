import { Router } from "express";
import { getAll, getById, create } from "../controllers/product.controller";
import { uploader } from "../middlewares/multer.middleware";

const router = Router();
const upload = uploader();

// get all
router.get("/", getAll);

//get by id
router.get("/:id", getById);

//create
router.post(
  "/",
  upload.fields([
    {
      name: "cover_image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  create,
);

// update
// delete
// get featured product
// get new arrivals

export default router;
