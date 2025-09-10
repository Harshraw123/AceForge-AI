import express from 'express';
import { mockInterview, testVapiKey } from '../controllers/mock-Interview.js';

const router = express.Router();

// Test API key endpoint
router.get('/test-key', testVapiKey);

// Create mock interview assistant
router.post('/', mockInterview);

export default router;


