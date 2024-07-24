import { Router } from 'express';

import { authorization, validateDto } from '~/middlewares';

import { AddToCartDto, UpdateCartDto } from './dtos';
import cartController from './cart.controller';

const router = Router();

router.post('/', authorization, validateDto(AddToCartDto), cartController.addToCart);
router.get('/', authorization, cartController.getMyCart);
router.put('/', authorization, validateDto(UpdateCartDto), cartController.updateCart);
router.delete('/:productId', authorization, cartController.deleteProductInCart);

export default router;
