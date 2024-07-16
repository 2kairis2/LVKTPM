import express from 'express';

import cartRoute from './cart.route';
import orderRoute from './order.route';
import userRoute from './user.route';
import paymentRoute from './payment.route';
import productRoute from './product.route';
import productTypeRoute from './productType.route';
import roleRoute from './role.route';
import imageRoute from './image.route';
import supplierRoute from './supplier.route';

const router = express.Router();

router.use('/carts', cartRoute);
router.use('/orders', orderRoute);
router.use('/users', userRoute);
router.use('/payments', paymentRoute);
router.use('/products', productRoute);
router.use('/product-types', productTypeRoute);
router.use('/roles', roleRoute);
router.use('/images', imageRoute);
router.use('/suppliers', supplierRoute);

export default router;
