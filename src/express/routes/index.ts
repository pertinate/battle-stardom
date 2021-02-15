import { Router } from 'express';
import api from './api';
import frontend from './frontend';

const router = Router();

router.use('/api', api);

router.use(frontend);

export default router;
