import express from "express";

import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/auth/login",
  
  AuthControllers.loginUser,
);
// GET route to retrieve user details by ID
router.get("/auth/user/:id", AuthControllers.getUserById);

router.get('/user/validAuth/:token', AuthControllers.validateToken)
export const AuthRoutes = router;
