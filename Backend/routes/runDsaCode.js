import express from 'express';

import { runDsaCode } from '../controllers/dsaCodeRunner.controller.js';
const router = express.Router();


router.post("/run",runDsaCode );

export default router
