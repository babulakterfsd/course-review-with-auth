import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import config from '../../config';
import { TChangePasswordData, TDecodedUser, TUser } from './user.interface';
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
const changePasswordInDB = async (
  passwordData: TChangePasswordData,
  user: TDecodedUser,
) => {
  const { currentPassword, newPassword } = passwordData;

  const userFromDB = await UserModel.findOne({ email: user?.email });

  if (!userFromDB) {
    throw new JsonWebTokenError('Unauthorized Access !');
  }

  const isPasswordMatched = await bcrypt.compare(
    currentPassword,
    userFromDB.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Current password does not match');
  }

  // check if new password is different from current password
  if (currentPassword === newPassword) {
    throw new Error('New password must be different from current password');
  }

  // check if new password is minimum 6 characters and consist of letters and numbers both
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if (!newPassword.match(passwordRegex)) {
    throw new Error(
      'New password must be minimum 6 characters and includes both letters and numbers',
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const result = await UserModel.findOneAndUpdate(
    { email: user?.email },
    {
      password: hashedPassword,
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
