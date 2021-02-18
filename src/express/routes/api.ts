import { Router } from 'express';

const router = Router();

router.get('/health', (request, response) => {
    response.status(200).send({ status: 'ok' });
});

export default router;
