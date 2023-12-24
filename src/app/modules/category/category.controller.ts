import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category has been created succesfully',
    data: result,
  });
});

const getAllCategories: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories have been retrieved succesfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
};
