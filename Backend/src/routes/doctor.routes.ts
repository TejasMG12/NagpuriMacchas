import { Router } from "express";
import { answer, firsttime } from "../controllers/cc.controller";
import upload from "../handlers/gpt/image.service";
import { answerImage } from "../controllers/cc.controller";
const router = Router();

router.post("/firsttime", firsttime);
router.post("/answer", answer);
router.post("/upload", upload.single("image"), answerImage);


export default router;
