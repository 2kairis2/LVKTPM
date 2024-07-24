import { Request, Response } from 'express';

import { handleError, responseWithData } from '~/helper';
import cartService from './cart.service';

const cartController = {
    addToCart: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const { _id: userId } = req.user;
            const result = await cartService.addToCart(userId, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getMyCart: async (req: Request, res: Response) => {
        try {
            const { _id: userId } = req.user;
            const result = await cartService.getMyCart(userId);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateCart: async (req: Request, res: Response) => {
        try {
            const { _id: userId } = req.user;
            const data = req.body;

            const result = await cartService.updateCart(userId, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    deleteProductInCart: async (req: Request, res: Response) => {
        try {
            const { _id: userId } = req.user;
            const { productId } = req.params;
            const result = await cartService.deleteProductInCart(userId, productId);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default cartController;
