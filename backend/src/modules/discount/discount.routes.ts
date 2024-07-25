import { Router } from 'express';

import { validatePermission, validateDto } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateDiscountDto, UpdateDiscountDto } from './dtos';
import discountController from './discount.controller';

const router = Router();

router.post(
    '/',
    validateDto(CreateDiscountDto),
    validatePermission(IPermission.CREATE_DISCOUNT),
    discountController.createDiscount,
);
router.get('/', validatePermission(IPermission.READ_DISCOUNT), discountController.getDiscount);
router.get('/info/:id', validatePermission(IPermission.READ_DISCOUNT), discountController.getDiscountById);
router.put(
    '/:id',
    validateDto(UpdateDiscountDto),
    validatePermission(IPermission.UPDATE_DISCOUNT),
    discountController.updateDiscount,
);
router.delete('/:id', validatePermission(IPermission.DELETE_DISCOUNT), discountController.deleteDiscount);

export default router;
