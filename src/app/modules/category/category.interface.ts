/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TCategory = {
  name: string;
};

//for creating statics
export interface TCategoryModel extends Model<TCategory> {
  isCategoryIdExists(categoryId: string): Promise<TCategory | null>;
}
