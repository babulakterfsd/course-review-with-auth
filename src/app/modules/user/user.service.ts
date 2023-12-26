import { TUser } from './user.interface';

//create user in DB
const registerUserInDB = async (user: TUser) => {
  console.log('registerUserInDB : ', user);
};

// login user
const loginUser = async (user: TUser) => {
  console.log('loginUser : ', user);
};

// change password
const changePasswordInDB = async (user: TUser) => {
  console.log('changePassword : ', user);
};

export const UserServices = {
  registerUserInDB,
  loginUser,
  changePasswordInDB,
};
