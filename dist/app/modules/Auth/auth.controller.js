"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = exports.validateToken = exports.getUserById = exports.loginUser = void 0;
// auth.controller.ts
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
// Controller function to handle user login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginData = yield auth_service_1.AuthServices.loginUser(req.body);
        const { accessToken: token, user } = loginData;
        // Set cookie with JWT token
        res.cookie("token", token, { maxAge: 900000, httpOnly: true });
        // Send successful response
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User is logged in successfully!",
            data: { token, user },
        });
    }
    catch (error) {
        // Handle different error scenarios
        const errorMessage = error.message;
        let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        if (errorMessage === "User not found") {
            statusCode = http_status_1.default.NOT_FOUND;
        }
        else if (errorMessage === "Incorrect password") {
            statusCode = http_status_1.default.UNAUTHORIZED; // or FORBIDDEN, based on your application logic
        }
        // Send error response
        (0, sendResponse_1.default)(res, {
            statusCode,
            success: false,
            message: errorMessage,
            data: null,
        });
    }
});
exports.loginUser = loginUser;
// Controller function to get user details by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id; // Assuming the user ID is passed as a route parameter
    try {
        const user = yield auth_service_1.AuthServices.getUserByIdFromDB(userId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User details retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        // Handle errors
        const errorMessage = error.message;
        let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        if (errorMessage === "User not found") {
            statusCode = http_status_1.default.NOT_FOUND;
        }
        (0, sendResponse_1.default)(res, {
            statusCode,
            success: false,
            message: errorMessage,
            data: null,
        });
    }
});
exports.getUserById = getUserById;
// Controller function to validate JWT token
const validateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    try {
        const validToken = yield auth_service_1.AuthServices.getUserAuthValid(token);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Token validated successfully",
            data: validToken,
        });
    }
    catch (error) {
        let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        let errorMessage = "Failed to validate token";
        if (error.message === "Token expired") {
            statusCode = http_status_1.default.UNAUTHORIZED;
            errorMessage = "Token expired";
        }
        else if (error.message === "Invalid token") {
            statusCode = http_status_1.default.BAD_REQUEST;
            errorMessage = "Invalid token";
        }
        (0, sendResponse_1.default)(res, {
            statusCode,
            success: false,
            message: errorMessage,
            data: null,
        });
    }
});
exports.validateToken = validateToken;
// Export all authentication controllers
exports.AuthControllers = {
    loginUser: exports.loginUser,
    getUserById: exports.getUserById,
    validateToken: exports.validateToken,
};
