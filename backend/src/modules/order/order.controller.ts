import { Request, Response } from 'express';

import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
import orderService from './order.service';

const orderController = {
    createOrder: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const { _id: userId } = req.user;
            const result = await orderService.createOrder({ ...data, user: userId });
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getMyOrder: async (req: Request, res: Response) => {
        try {
            const { _id: userId } = req.user;
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query, 'ORDER');

            const result = await orderService.getOrder({
                limit,
                query: { ...query, user: userId },
                sort,
                skip,
                includes,
            });
            const total = await orderService.countDocuments({ ...query, user: userId });

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getOrder: async (req: Request, res: Response) => {
        try {
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query, 'ORDER');

            const result = await orderService.getOrder({
                limit,
                query,
                sort,
                skip,
                includes,
            });
            const total = await orderService.countDocuments(query);

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getOrderById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query;

            const result = await orderService.getOrderById(id, includes as string | Array<string>);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateOrder: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const { _id: userId } = req.user;

            const result = await orderService.updateOrder(id, data, userId);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default orderController;
