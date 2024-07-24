import { Router } from 'express';

import { validatePermission, validateDto } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateProductDetailDto, UpdateProductDetailDto } from './dtos';
import productDetailController from './product-detail.controller';

const router = Router();

router.post(
    '/',
    validateDto(CreateProductDetailDto),
    validatePermission(IPermission.CREATE_PRODUCT_DETAIL),
    productDetailController.createProductDetail,
);
router.get('/', validatePermission(IPermission.READ_PRODUCT_DETAIL), productDetailController.getProductDetail);
router.get(
    '/info/:id',
    validatePermission(IPermission.READ_PRODUCT_DETAIL),
    productDetailController.getProductDetailById,
);
router.put(
    '/:id',
    validateDto(UpdateProductDetailDto),
    validatePermission(IPermission.UPDATE_PRODUCT_DETAIL),
    productDetailController.updateProductDetail,
);

export default router;
