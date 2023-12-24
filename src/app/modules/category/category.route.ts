import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './category.controller';
import { categorySchema } from './category.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(categorySchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
