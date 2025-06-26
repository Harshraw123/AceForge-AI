import express from 'express';
const router = express.Router();
import { runCode } from '../controllers/code.controller.js'

router.post("/run", runCode);

export default router
