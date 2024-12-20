"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/auth/login", auth_controller_1.AuthControllers.loginUser);
// GET route to retrieve user details by ID
router.get("/auth/user/:id", auth_controller_1.AuthControllers.getUserById);
router.get('/user/validAuth/:token', auth_controller_1.AuthControllers.validateToken);
exports.AuthRoutes = router;
