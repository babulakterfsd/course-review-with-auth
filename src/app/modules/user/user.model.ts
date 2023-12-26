import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password should be at least 6 characters long'],
      validate: {
        validator: (value: string) => {
          // Password must contain at least one letter and one numeric character
          const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
          return passwordRegex.test(value);
        },
        message: () =>
          'Password should contain at least one letter and one numeric character',
      },
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message:
          '{VALUE} is not a valid role. Choose either "user" or "admin".',
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<TUser>('users', userSchema);
