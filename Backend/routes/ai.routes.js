import express from 'express';
import { generateInterviewQuestions } from '../controllers/ai.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/generate-questions', protect, generateInterviewQuestions);

export default router; 