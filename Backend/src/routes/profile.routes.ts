import { Router } from "express";
import ProfileController from "../controllers/profile.controller";

const router = Router();

// Profile Routes (Protected)
router.get("/:email", ProfileController.getProfile);
router.put("/:email", ProfileController.updateProfile);
router.delete("/:email", ProfileController.deleteProfile);

export default router;
