import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { courseDataToBeUpdatedSchema } from './course.validation';

const router = express.Router();

router.put(
  '/:courseId',
  validateRequest(courseDataToBeUpdatedSchema),
  CourseControllers.updateCourse,
);
router.get('/:courseId/reviews', CourseControllers.getSingleCourseWithReviews);
router.get('/', CourseControllers.getAllCourses);

export const CoursesRoutes = router;
