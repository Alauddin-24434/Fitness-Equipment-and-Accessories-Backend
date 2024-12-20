/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  [x: string]: any;
  name: string;
  email: string;
  password: string;

  role: "admin" | "user";
 
}

export interface UserModel extends Model<TUser> {

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;