import express from 'express';
const router = express.Router();

import productTypeController from '~/controllers/productType.controller';

router.route('/').get(productTypeController.getProductTypes);
router.route('/:id').get(productTypeController.getProductTypeById);

export default router;
