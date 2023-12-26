/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};

//for creating statics
export interface TUserModel extends Model<TUser> {
  isUserExists(username: string, email: string): Promise<TUser | null>;
}
