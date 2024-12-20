// auth.controller.ts
import httpStatus from "http-status";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

// Controller function to handle user login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const loginData = await AuthServices.loginUser(req.body);
    const { accessToken: token, user } = loginData;

    // Set cookie with JWT token
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });

    // Send successful response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User is logged in successfully!",
      data: { token, user },
    });
  } catch (error) {
    // Handle different error scenarios
    const errorMessage = (error as Error).message;
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR as any;

    if (errorMessage === "User not found") {
      statusCode = httpStatus.NOT_FOUND;
    } else if (errorMessage === "Incorrect password") {
      statusCode = httpStatus.UNAUTHORIZED; // or FORBIDDEN, based on your application logic
    }

    // Send error response
    sendResponse(res, {
      statusCode,
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

// Controller function to get user details by ID
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id; // Assuming the user ID is passed as a route parameter

  try {
    const user = await AuthServices.getUserByIdFromDB(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User details retrieved successfully",
      data: user,
    });
  } catch (error) {
    // Handle errors
    const errorMessage = (error as Error).message;
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR as any

    if (errorMessage === "User not found") {
      statusCode = httpStatus.NOT_FOUND;
    }

    sendResponse(res, {
      statusCode,
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

// Controller function to validate JWT token
export const validateToken = async (req: Request, res: Response) => {
  const token = req.params.token;
  try {
    const validToken = await AuthServices.getUserAuthValid(token);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Token validated successfully",
      data: validToken,
    });
  } catch (error:any) {
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR as any;
    let errorMessage = "Failed to validate token";

    if (error.message === "Token expired") {
      statusCode = httpStatus.UNAUTHORIZED;
      errorMessage = "Token expired";
    } else if (error.message === "Invalid token") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Invalid token";
    }

    sendResponse(res, {
      statusCode,
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

// Export all authentication controllers
export const AuthControllers = {
  loginUser,
  getUserById,
  validateToken,
};
