import { Router } from 'express';
import { getScatter } from './scatterHandler';

const router = Router();

router.get('/scatter/:courseId', getScatter);

export default router;
