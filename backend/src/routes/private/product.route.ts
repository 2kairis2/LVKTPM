import express from 'express';
const router = express.Router();

import productController from '~/controllers/product.controller';
import { validationMiddleware } from '~/middlewares/validation';
import { CreateProductDto, UpdateProductDto } from '~/dtos/product';
import { authentication } from '~/middlewares/guard';
import { IPermission } from '~/types';

router.post(
    '/',
    authentication(IPermission.CREATE_PRODUCT),
    validationMiddleware(CreateProductDto),
    productController.createProduct,
);
router.put(
    '/:id',
    authentication(IPermission.UPDATE_PRODUCT),
    validationMiddleware(UpdateProductDto),
    productController.updateProduct,
);
router.delete('/:id', authentication(IPermission.DELETE_PRODUCT), productController.deleteProduct);

export default router;
