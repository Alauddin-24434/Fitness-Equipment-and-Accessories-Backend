import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { Request, Response } from "express";

// Create user
const createUser = async (req: Request, res: Response) => {
  try {
    const bodyData = req.body;
    const result = await userServices.createUserIntoDB(bodyData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User is created successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    const statusCode =
      errorMessage.includes("User already exists")
        ? httpStatus.CONFLICT
        : httpStatus.INTERNAL_SERVER_ERROR;

    sendResponse(res, {
      statusCode,
      success: false,
      message: errorMessage,
      data: null,
    });
  }
};

export const userControllers = {
  createUser,
};
