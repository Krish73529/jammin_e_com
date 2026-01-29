import mongoose from "mongoose";
import { ROLE } from "../types/enum.types";
//user schema
const user_schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "user first_name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "user last_name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "user already exists with provided email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password must be at least 6 char. long"],
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    //profileimage
    //image  upload => server=> cloud
    //cloudinary => aws, azure

    profile_image: {
      type: {
        path: {
          type: String,
          required: [true, "profile_image url is required"],
        },
      },
      required: false,
    },
  },

  { timestamps: true },
);
//! user model

const User = mongoose.model("user", user_schema);

export default User;
