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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if a user with the same email already exists
        const existingUser = yield user_model_1.User.findOne({ email: payload.email });
        if (existingUser) {
            throw new Error("User already exists with this email");
        }
        const newUser = yield user_model_1.User.create(payload);
        return newUser;
    }
    catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
});
exports.userServices = { createUserIntoDB };
