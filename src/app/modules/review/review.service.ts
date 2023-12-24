import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { CourseModel } from '../course/course.model';
import { TReview } from './review.interface';
import { ReviewModel } from './review.model';

const createReviewInDB = async (review: TReview) => {
  const courseId = review.courseId.toString();
  const courseExists = await CourseModel.isCourseIdExists(courseId);
  if (!courseExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'CourseId does not exists');
  }

  const result = await ReviewModel.create(review);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create review');
  } else {
    return result;
  }
};

export const ReviewServices = {
  createReviewInDB,
};
