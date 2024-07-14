import express from 'express';
const router = express.Router();

import productTypeController from '~/controllers/productType.controller';

router.route('/').post(productTypeController.createProductType);

router.route('/:id').put(productTypeController.updateProductType).delete(productTypeController.deleteProductType);

export default router;
