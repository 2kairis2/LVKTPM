import express from 'express';
const router = express.Router();

import cartController from '~/controllers/carts.controller';

router.get('/', cartController.getCart);
router.put('/', cartController.addToCart);
router.delete('/', cartController.removeFromCart);

export default router;
