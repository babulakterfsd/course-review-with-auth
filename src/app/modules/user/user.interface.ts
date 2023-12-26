/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};

export type TChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

export type TDecodedUser = {
  id: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
};

//for creating statics
export interface TUserModel extends Model<TUser> {
  isUserExistsWithUsername(username: string): Promise<TUser | null>;
  isUserExistsWithEmail(email: string): Promise<TUser | null>;
}
