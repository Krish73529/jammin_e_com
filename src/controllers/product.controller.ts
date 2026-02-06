import { NextFunction, Request, Response } from "express";
import Product from "../models/product.model";
import AppError from "../middlewares/error_handler.middleware";
import { ERROR_CODES } from "../types/enum.types";
import Category from "../models/category.model";
import Brand from "../models/brand.model";
import { upload } from "../utils/cloudinary.utils";

interface IExpressFiles {
  cover_image?: Express.Multer.File[];
  images?: Express.Multer.File[];
}

const dir = "/products";

//! get all
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      message: "Products fetched",
      data: products,
      status: "success",
      code: "SUCCESS",
    });
  } catch (error) {
    next(error);
  }
};

//!  get by id
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      throw new AppError("Product not found", ERROR_CODES.NOT_FOUND_ERR, 404);
    }

    res.status(200).json({
      message: `Product ${product._id} fetched`,
      data: product,
      status: "success",
      code: "SUCCESS",
    });
  } catch (error) {
    next(error);
  }
};

//! create

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      description,
      category,
      brand,
      price,
      stock,
      is_featured,
      new_arrival,
    } = req.body;

    // images
    const { cover_image, images } = req.files as IExpressFiles;
    console.log(cover_image);
    console.log(images);
    if (!cover_image) {
      throw new AppError(
        "cover_image is required",
        ERROR_CODES.VALIDATION_ERR,
        400,
      );
    }

    if (!category) {
      throw new AppError(
        "Category is required",
        ERROR_CODES.VALIDATION_ERR,
        400,
      );
    }

    if (!brand) {
      throw new AppError("Brand is required", ERROR_CODES.VALIDATION_ERR, 400);
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      is_featured,
      new_arrival,
    });

    //
    const product_category = await Category.findOne({ _id: category });
    if (!product_category) {
      throw new AppError("Category not found", ERROR_CODES.NOT_FOUND_ERR, 404);
    }

    const product_brand = await Brand.findOne({ _id: brand });
    if (!product_brand) {
      throw new AppError("Brand not found", ERROR_CODES.NOT_FOUND_ERR, 404);
    }

    product.category = product_category._id;
    product.brand = product_brand._id;

    //! cover
    // upload
    const { path, public_id } = await upload(cover_image[0], dir);

    product.cover_image = {
      path: path,
      public_id: public_id,
    };

    // images

    // save product
    await product.save();

    res.status(201).json({
      message: `Product ${product._id} created`,
      data: product,
      status: "success",
      code: "SUCCESS",
    });
  } catch (error) {
    next(error);
  }
};

// update

// delete

// get all featured

// get all new arrivals
