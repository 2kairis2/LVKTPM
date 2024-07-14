import express from 'express';

import privateRoute from './private';
import publicRoute from './public';
import { authorization } from '~/middlewares/guard';

const router = express.Router();

router.use('/private', authorization, privateRoute);
router.use('/', publicRoute);

export default router;
