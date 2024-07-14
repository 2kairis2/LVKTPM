import express from 'express';
const router = express.Router();

import orderControl from '~/controllers/order.controller';
import { authentication } from '~/middlewares/guard';
import { IPermission } from '~/types';

router.get('/', authentication(IPermission.READ_ORDER), orderControl.getOrders);
router.post('/', authentication(IPermission.CREATE_ORDER), orderControl.createOrder);
router.get('/:id', authentication(IPermission.READ_ORDER), orderControl.getOrderById);
router.patch('/:id', authentication(IPermission.UPDATE_ORDER), orderControl.updateOrderById);

export default router;
