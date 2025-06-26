// routes/code.js
import express from "express";
import {  askGeminiAI } from "../controllers/aiReview.controller.js";

const router = express.Router();


router.post("/ai", askGeminiAI);

export default router;
