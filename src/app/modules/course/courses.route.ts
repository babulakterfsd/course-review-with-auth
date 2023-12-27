import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { courseDataToBeUpdatedSchema, courseSchema } from './course.validation';

const router = express.Router();

router.put(
  '/:courseId',
  validateRequest(courseDataToBeUpdatedSchema),
  CourseControllers.updateCourse,
);
router.get('/:courseId/reviews', CourseControllers.getSingleCourseWithReviews);
router.post(
  '/',
  auth('admin'),
  validateRequest(courseSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourses);

export const CoursesRoutes = router;
