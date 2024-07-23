import { Request, Response } from 'express';

import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
import supplierService from './supplier.service';

const supplierController = {
    createSupplier: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await supplierService.createSupplier(data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getSupplier: async (req: Request, res: Response) => {
        try {
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query, 'SUPPLIER');

            const result = await supplierService.getSupplier({
                limit,
                query,
                sort,
                skip,
                includes,
            });
            const total = await supplierService.countDocuments(query);

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getSupplierById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query;

            const result = await supplierService.getSupplierById(id, includes as string | Array<string>);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateSupplier: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await supplierService.updateSupplier(id, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    deleteSupplier: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const result = await supplierService.deleteSupplier(id);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default supplierController;
