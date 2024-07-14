import { Request, Response } from 'express';
import { convertError } from '../helper';

import Order from '../models/order';
import productController from './product.controller';

const orderController = {
    getOrders: async (req: Request, res: Response) => {
        try {
            const data = await Order.find().populate('user').populate('items.product');
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
    createOrder: async (req: Request, res: Response) => {
        try {
            const data = await Order.create(req.body);
            await productController.reduceQuantity(req.body.items);
            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
    getOrderById: async (req: Request, res: Response) => {
        try {
            const orderId = req.query.orderId;
            const data = await Order.findById(orderId).populate('user').populate('items.product');
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
    updateOrderById: async (req: Request, res: Response) => {
        try {
            const orderId = req.query.orderId;
            const updatedData = req.body;

            const data = await Order.findByIdAndUpdate(orderId, updatedData, {
                new: true,
            })
                .populate('user')
                .populate('items.product');

            if (!data) {
                return res.status(404).json({ message: 'Order not found' });
            }

            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
};

export default orderController;
