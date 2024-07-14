import express from 'express';

import authRouter from './auth.route';
import productRouter from './product.route';
import productTypeRouter from './productType.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/auth', authRouter);
router.use('/product-types', productTypeRouter);

export default router;
