import { Router } from 'express';

import { validatePermission, validateDto, authorization } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateOrderDto, UpdateOrderDto } from './dtos';
import orderController from './order.controller';

const router = Router();

router.post(
    '/',
    validateDto(CreateOrderDto),
    validatePermission(IPermission.CREATE_ORDER),
    orderController.createOrder,
);
router.get('/', validatePermission(IPermission.READ_ORDER), orderController.getOrder);
router.get('/info/:id', validatePermission(IPermission.READ_ORDER), orderController.getOrderById);
router.get('/me', authorization, orderController.getMyOrder);
router.put(
    '/:id',
    validateDto(UpdateOrderDto),
    validatePermission(IPermission.UPDATE_ORDER),
    orderController.updateOrder,
);

export default router;
