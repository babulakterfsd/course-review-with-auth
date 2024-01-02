/* eslint-disable no-unsafe-optional-chaining */
import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import config from '../../config';
import {
  TChangePasswordData,
  TDecodedUser,
  TLastPassword,
  TUser,
} from './user.interface';
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
      'User with same username or email already exists, please try with different username or email',
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
const changePasswordInDB = async (
  passwordData: TChangePasswordData,
  user: TDecodedUser,
) => {
  const { currentPassword, newPassword } = passwordData;

  // check if the user exists in the database
  const userFromDB = await UserModel.findOne({ email: user?.email });
  if (!userFromDB) {
    throw new JsonWebTokenError('Unauthorized Access!');
  }

  // check if the current password the user gave is correct
  const isPasswordMatched = await bcrypt.compare(
    currentPassword,
    userFromDB.password,
  );
  if (!isPasswordMatched) {
    throw new Error('Current password does not match');
  }

  // Check if new password is the same as the current one
  const isSameAsCurrent = currentPassword === newPassword;
  if (isSameAsCurrent) {
    throw new Error('New password must be different from the current password');
  }

  // Check if the new password is the same as the last two passwords
  const isSameAsLastTwoPasswords = userFromDB?.lastTwoPasswords?.some(
    (password: TLastPassword) => {
      return bcrypt.compareSync(newPassword, password.oldPassword);
    },
  );

  if (isSameAsLastTwoPasswords) {
    const lastUsedDate = userFromDB?.lastTwoPasswords?.[0]?.changedAt;
    const formattedLastUsedDate = lastUsedDate
      ? new Date(lastUsedDate).toLocaleString()
      : 'unknown';

    throw new Error(
      `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedLastUsedDate}).`,
    );
  }

  // Check if the new password meets the minimum requirements
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!newPassword.match(passwordRegex)) {
    throw new Error(
      'New password must be minimum 6 characters and include both letters and numbers',
    );
  }

  // Update the password and keep track of the last two passwords
  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  const newLastTwoPasswords = () => {
    if (userFromDB?.lastTwoPasswords?.length === 0) {
      return [{ oldPassword: userFromDB?.password, changedAt: new Date() }];
    } else if (userFromDB?.lastTwoPasswords?.length === 1) {
      return [
        ...userFromDB?.lastTwoPasswords,
        { oldPassword: userFromDB?.password, changedAt: new Date() },
      ];
    } else if (userFromDB?.lastTwoPasswords?.length === 2) {
      return [
        userFromDB?.lastTwoPasswords[1],
        { oldPassword: userFromDB?.password, changedAt: new Date() },
      ];
    }
  };

  const result = await UserModel.findOneAndUpdate(
    { email: user?.email },
    {
      password: hashedNewPassword,
      lastTwoPasswords: newLastTwoPasswords(),
    },
    {
      new: true,
    },
  );

  return result;
};

export const UserServices = {
  registerUserInDB,
  loginUser,
  changePasswordInDB,
};
