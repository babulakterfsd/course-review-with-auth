import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

//create user
const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User has been registered succesfully',
    data: result,
  });
});

//login user
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User has been logged in succesfully',
    data: result,
  });
});

//change password
const changePassword = catchAsync(async (req, res) => {
  const result = await UserServices.changePasswordInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User password has been changed succesfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
  changePassword,
};
