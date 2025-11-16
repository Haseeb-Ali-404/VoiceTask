import express from "express";
import { parseVoice } from "../parseGemini.js";

const router = express.Router();

router.post("/parse", parseVoice);

export default router;
