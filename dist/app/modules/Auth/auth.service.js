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
exports.AuthServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../User/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the user exists
        const user = yield user_model_1.User.findOne({ email: payload.email });
        if (!user) {
            throw new Error("User not found");
        }
        // Check if the password is correct
        const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, user.password);
        if (!isPasswordMatched) {
            throw new Error("Incorrect password");
        }
        // Create a jwt token
        const jwtPayload = {
            userId: user.id,
            role: user.role,
        };
        const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
            expiresIn: "10d",
        });
        return {
            accessToken,
            user,
        };
    }
    catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
});
const getUserByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        throw new Error(`Failed to fetch user by id: ${error.message}`);
    }
});
const getUserAuthValid = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        console.log(decoded); // Log decoded token to console
        const { userId } = decoded;
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new Error("Token expired");
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error("Invalid token");
        }
        else {
            throw new Error(`Failed to verify token: ${error.message}`);
        }
    }
});
exports.AuthServices = {
    loginUser,
    getUserByIdFromDB,
    getUserAuthValid
};
