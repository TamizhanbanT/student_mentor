// src/routes/auth.routes.ts
import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { isAuthenticated, isAdmin, isAdminOrMentor } from "../middlewares/auth";

const router = Router();

router.post("/register/student", isAuthenticated, isAdminOrMentor, authController.registerStudent);
router.post("/register/mentor", isAuthenticated, isAdmin, authController.registerMentor);
router.post("/login", authController.login);

export default router;
