import express from 'express';
import protect from '../middlewares/auth.middleware.js';
import { createQuizSession, getQuizById, submitQuizAnswers } from '../controllers/quiz.controller.js';

const router = express.Router();

// Quiz session routes
router.post('/generate', protect, createQuizSession);
router.get('/:quizId', protect, getQuizById);
router.post('/:quizId/submit', protect, submitQuizAnswers);

export default router;
