import express from 'express';
const router = express.Router();

import productController from '~/controllers/product.controller';

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.get('/slug/:slug', productController.getProductBySlug);

export default router;
