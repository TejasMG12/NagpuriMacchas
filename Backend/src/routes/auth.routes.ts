import { Router } from "express";
import authController from "../controllers/auth.contoller";

const router = Router();

// Auth Routes
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

export default router;
