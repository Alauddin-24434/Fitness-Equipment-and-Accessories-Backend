// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";

// import catchAsync from "../utils/catchAsync";
// import AppError from "../error/AppError";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import config from "../config";
// import { TUserRole } from "../modules/User/user.interface";
// import { User } from "../modules/User/user.model";


// const authValidation = (...requiredRoles: TUserRole[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization?.split(' ')[1]; 
 
   
//     // checking if the token is missing
//     if (!token) {
//       throw new AppError(
//         httpStatus.UNAUTHORIZED,
//         "You have no access to this route",
//       );
//     }

//     // checking if the given token is valid
//     const decoded = jwt.verify(
//       token,
//       config.jwt_access_secret as string,
//     ) as JwtPayload;

//     const { role, userId } = decoded;
// console.log(userId)
//     // checking if the user is exist
//     const user = await User.findById(userId);
//     console.log(user)

//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
//     }

//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new AppError(
//         httpStatus.UNAUTHORIZED,
//         "You have no access to this route",
//       );
//     }

//     // req.user = decoded as JwtPayload;
//     next();
//   });
// };

// export default authValidation;