import { Router } from 'express';

import { validatePermission, validateDto } from '~/middlewares';
import { IPermission } from '~/types';
import { CreateProductDto, UpdateProductDto } from './dtos';
import productController from './product.controller';

const router = Router();

router.post(
    '/',
    validateDto(CreateProductDto),
    validatePermission(IPermission.CREATE_PRODUCT),
    productController.createProduct,
);
router.get('/', validatePermission(IPermission.READ_PRODUCT), productController.getProduct);
router.get('/info/:id', validatePermission(IPermission.READ_PRODUCT), productController.getProductById);
router.put(
    '/:id',
    validateDto(UpdateProductDto),
    validatePermission(IPermission.UPDATE_PRODUCT),
    productController.updateProduct,
);
router.delete('/:id', validatePermission(IPermission.DELETE_PRODUCT), productController.deleteProduct);

export default router;
