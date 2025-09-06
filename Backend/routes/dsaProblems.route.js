import express from 'express';
import protect from '../middlewares/auth.middleware.js';

import { fetchDataFromDsaSchema, updateDsaSchema } from '../controllers/dsaSession.controller.js';

const router = express.Router();

// Quiz session routes
router.post('/update', protect,updateDsaSchema );
router.get('/progress', protect, fetchDataFromDsaSchema );


export default router;
