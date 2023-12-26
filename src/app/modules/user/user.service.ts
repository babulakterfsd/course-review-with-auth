import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

//create user in DB
const registerUserInDB = async (user: TUser) => {
  const isUserExistsWithUsername = await UserModel.isUserExistsWithUsername(
    user?.username,
  );

  const isUserExistsWithEmail = await UserModel.isUserExistsWithEmail(
    user?.email,
  );

  if (isUserExistsWithUsername || isUserExistsWithEmail) {
    throw new Error(
      'User with same username or email already exists, try with different username or email',
    );
  } else {
    const result = await UserModel.create(user);
    return result;
  }
};

// login user
const loginUser = async (user: TUser) => {
  const userFromDB = await UserModel.isUserExistsWithUsername(user?.username);
  if (!userFromDB) {
    throw new Error('No user found with this username');
  }
  const isPasswordMatched = await bcrypt.compare(
    user?.password,
    userFromDB.password,
  );
  if (!isPasswordMatched) {
    throw new Error('Incorrect password');
  }

  //create token and send it to client side
  const payload = {
    id: userFromDB?._id,
    role: userFromDB?.role,
    email: userFromDB?.email,
  };

  const accesstoken = jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    accesstoken,
    userFromDB,
  };
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
