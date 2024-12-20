
import jwt from "jsonwebtoken";
import config from "../../config";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";


const loginUser = async (payload: TLoginUser) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password is correct
    const isPasswordMatched = await User.isPasswordMatched(
      payload.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new Error("Incorrect password");
    }

    // Create a jwt token
    const jwtPayload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: "10d",
    });

    return {
      accessToken,
      user,
    };
  } catch (error) {
    throw new Error(`Login failed: ${(error as Error).message}`);
  }
};

const getUserByIdFromDB = async (id: string) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user by id: ${(error as Error).message}`);
  }
};
const getUserAuthValid = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as { userId: string };

    console.log(decoded); // Log decoded token to console

    const { userId } = decoded;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    } else {
      throw new Error(`Failed to verify token: ${(error as Error).message}`);
    }
  }
};








export const AuthServices = {
  loginUser,
  getUserByIdFromDB,
  getUserAuthValid

};
