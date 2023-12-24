import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { courseSchema } from './course.validation';

const router = express.Router();

router.get('/best', CourseControllers.getBestCourse);
router.post('/', validateRequest(courseSchema), CourseControllers.createCourse);

export const CourseRoutes = router;
