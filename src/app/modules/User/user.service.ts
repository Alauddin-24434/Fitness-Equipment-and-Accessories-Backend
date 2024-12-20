import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const newUser = await User.create(payload);
    return newUser;
  } catch (error) {
    throw new Error(`Failed to create user: ${(error as Error).message}`);
  }
};

export const userServices = { createUserIntoDB };
