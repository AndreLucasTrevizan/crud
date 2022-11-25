import { Router } from 'express';
import { AuthRouter } from './modules/auth/router';

const router = Router();

router.get('/ping', (req, res) => res.send('Ping done 🚀'));

router.use('/auth', AuthRouter);

export default router;