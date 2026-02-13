import { Router } from "express";
import { create, getWishlist } from "../controllers/wishlist.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { OnlyUsers } from "../types/enum.types";

const router = Router();

//create/remove
router.post("/", create);

//get
router.get("/", getWishlist);

export default router;
