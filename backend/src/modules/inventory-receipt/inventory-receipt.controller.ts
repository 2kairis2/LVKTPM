import { Request, Response } from 'express';

import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
import inventoryReceiptService from './inventory-receipt.service';

const inventoryReceiptController = {
    createInventoryReceipt: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await inventoryReceiptService.createInventoryReceipt(data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getInventoryReceipt: async (req: Request, res: Response) => {
        try {
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query, 'INVENTORY_RECEIPT');

            const result = await inventoryReceiptService.getInventoryReceipt({
                limit,
                query,
                sort,
                skip,
                includes,
            });
            const total = await inventoryReceiptService.countDocuments(query);

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getInventoryReceiptById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query;

            const result = await inventoryReceiptService.getInventoryReceiptById(
                id,
                includes as string | Array<string>,
            );
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateInventoryReceipt: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await inventoryReceiptService.updateInventoryReceipt(id, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    deleteInventoryReceipt: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const result = await inventoryReceiptService.deleteInventoryReceipt(id);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default inventoryReceiptController;
