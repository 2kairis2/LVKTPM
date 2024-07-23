import { Request, Response } from 'express';

import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
import categoryService from './category.service';

const categoryController = {
    createCategory: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await categoryService.createCategory(data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getCategory: async (req: Request, res: Response) => {
        try {
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query);

            const result = await categoryService.getCategory({
                limit,
                query,
                sort,
                skip,
                includes,
            });
            const total = await categoryService.countDocuments(query);

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getCategoryById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query;

            const result = await categoryService.getCategoryById(id, includes as string | Array<string>);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await categoryService.updateCategory(id, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    deleteCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const result = await categoryService.deleteCategory(id);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default categoryController;
