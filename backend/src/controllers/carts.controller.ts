import { Request, Response } from 'express';
import { convertError } from '../helper';

import Cart from '../models/cart';

const cartController = {
    getCart: async (req: Request, res: Response) => {
        try {
            const { _id: userId } = req.user;

            if (!userId) throw new Error('User ID is required');

            const data = await Cart.findOne({ user: userId }).populate({
                path: 'items',
                populate: {
                    path: 'product',
                },
            });

            return res.status(200).json({
                data,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    addToCart: async (req: Request, res: Response) => {
        try {
            const { product, quantity, replace = false } = req.body;
            const { _id: userId } = req.user;

            if (quantity < 1) {
                return res.status(400).json({ message: 'Số lượng không hợp lệ' });
            }
            let cart = await Cart.findOne({ user: userId }).populate({
                path: 'items',
                populate: {
                    path: 'product',
                },
            });

            if (!cart) {
                cart = new Cart({
                    user: userId,
                    cartItems: [],
                });
            }

            if (cart.items.some((item) => item?.product?._id == product._id)) {
                cart.items.forEach((item) => {
                    if (item?.product?._id == product._id) {
                        item.quantity = replace ? quantity : item.quantity + quantity;
                    }
                });
            } else {
                cart.items.push({
                    product: product._id,
                    quantity: quantity,
                });
            }

            await cart.save();

            return res.status(201).json({ message: 'Thêm sản phẩm vào giỏ thành công', cart });
        } catch (error) {
            return res.status(500).json({ message: convertError(error) });
        }
    },
    removeFromCart: async (req: Request, res: Response) => {
        try {
            const { productIds } = req.body;
            const { _id: userId } = req.user;

            const cart = await Cart.findOne({ user: userId }).populate({
                path: 'items',
                populate: {
                    path: 'product',
                },
            });

            if (!cart) {
                return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
            }

            cart.set(
                'items',
                cart.items.filter((item) => !productIds.includes(item.product._id.toString())),
            );

            await cart.save();
            return res.status(200).json({ message: 'Xoá sản phẩm khỏi giỏ thành công', cart });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
};

export default cartController;
