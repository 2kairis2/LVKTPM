import { Request, Response } from 'express';

import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
import discountService from './discount.service';

const discountController = {
    createDiscount: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await discountService.createDiscount(data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getDiscount: async (req: Request, res: Response) => {
        try {
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query, 'DISCOUNT');

            const result = await discountService.getDiscount({
                limit,
                query,
                sort,
                skip,
                includes,
            });
            const total = await discountService.countDocuments(query);

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getDiscountById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query;

            const result = await discountService.getDiscountById(id, includes as string | Array<string>);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateDiscount: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await discountService.updateDiscount(id, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    deleteDiscount: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const result = await discountService.deleteDiscount(id);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default discountController;
