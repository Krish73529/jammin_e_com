import { NextFunction, Request, Response } from "express";
import Brand from "../models/brand.model";
import AppError from "../middlewares/error_handler.middleware";
import { ERROR_CODES } from "../types/enum.types";
import { deleteFile, upload } from "../utils/cloudinary.utils";

const dir = "/brands";

//* get all
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const brands = await Brand.find({});

    res.status(200).json({
      message: "Brands fetched",
      data: brands,
      code: "SUCCESS",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

//* get by id
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // id
    const { id } = req.params;

    const brand = await Brand.findOne({ _id: id });

    if (!brand) {
      throw new AppError("Brand not found", ERROR_CODES.NOT_FOUND_ERR, 404);
    }

    res.status(200).json({
      message: `Brand ${brand._id} fetched`,
      data: brand,
      code: "SUCCESS",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

//* create

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description } = req.body;
    const file = req.file;
    if (!name) {
      throw new AppError(
        "Brand name is required",
        ERROR_CODES.VALIDATION_ERR,
        400,
      );
    }

    if (!file) {
      throw new AppError(
        "Brand logo is required",
        ERROR_CODES.VALIDATION_ERR,
        400,
      );
    }

    const brand = new Brand({ name, description });

    // file upload
    if (file) {
      const { path, public_id } = await upload(file, dir);

      brand.logo = {
        path: path,
        public_id: public_id,
      };
    }

    await brand.save();

    res.status(200).json({
      message: `Brand ${brand._id} created`,
      data: brand,
      code: "SUCCESS",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

//* update

//* delete
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findOne({ _id: id });
    if (!brand) {
      throw new AppError("Brand not found", ERROR_CODES.NOT_FOUND_ERR, 404);
    }

    await deleteFile(brand.logo.public_id);

    await brand.deleteOne();

    res.status(200).json({
      message: `Brand ${brand._id} deleted`,
      code: "SUCCESS",
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
