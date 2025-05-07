import express from 'express';
import { getRates, getLatestRate } from '../controllers/ratesController';

const router = express.Router();

router.get('/', getRates);
router.get('/latest', getLatestRate);

export default router;
