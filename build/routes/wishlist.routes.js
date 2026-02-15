"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const router = (0, express_1.Router)();
//create/remove
router.post("/", wishlist_controller_1.create);
//get
router.get("/", wishlist_controller_1.getWishlist);
exports.default = router;
