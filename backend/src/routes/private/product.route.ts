import express from 'express';
const router = express.Router();

import productController from '~/controllers/product.controller';
import { validationMiddleware } from '~/middlewares/validation';
import { CreateUpdateProductDto } from '~/dtos';
import { authentication } from '~/middlewares/guard';
import { IPermission } from '~/types';

router.post(
    '/',
    authentication(IPermission.CREATE_PRODUCT),
    validationMiddleware(CreateUpdateProductDto),
    productController.createProduct,
);
router.patch(
    '/:id',
    authentication(IPermission.UPDATE_PRODUCT),
    validationMiddleware(CreateUpdateProductDto),
    productController.updateProduct,
);
router.delete('/:id', authentication(IPermission.DELETE_PRODUCT), productController.deleteProduct);

export default router;
