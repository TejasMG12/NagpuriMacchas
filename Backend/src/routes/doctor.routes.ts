import { Router } from "express";
import { answer, firsttime } from "../controllers/cc.controller" ; 
const router = Router();

// Auth Routes
router.post("/firsttime", firsttime);
router.post("/answer",answer );

export default router;
