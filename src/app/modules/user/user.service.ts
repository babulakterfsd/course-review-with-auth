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
