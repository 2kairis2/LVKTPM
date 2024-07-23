import { Request, Response } from 'express';

import { handleError, responseWithData, getQueriesPaginate, responseWithPagination, convertIncludes } from '~/helper';
import productService from './product.service';
import categoryService from '~/modules/category/category.service';
import typeService from '~/modules/type/type.service';

const productController = {
    createProduct: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await productService.createProduct(data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getProduct: async (req: Request, res: Response) => {
        try {
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query);

            let category: any | null = null;
            let type: any | null = null;

            if (req.query.category) {
                const categories = await categoryService.getCategory({
                    query: {
                        slug: req.query.category,
                    },
                });
                if (categories.length > 0) {
                    category = categories[0];
                }
            }

            if (req.query.type) {
                const types = await typeService.getType({
                    query: {
                        slug: req.query.type,
                    },
                });
                if (types.length > 0) {
                    type = types[0];
                }
            }

            const result = await productService.getProduct({
                limit,
                query: {
                    ...query,
                    ...(category && { category: category._id }),
                    ...(type && { type: type._id }),
                },
                sort,
                skip,
                includes,
            });
            const total = await productService.countDocuments(query);

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getProductById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query;

            const result = await productService.getProductById(id, convertIncludes(includes as string));
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateProduct: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await productService.updateProduct(id, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    deleteProduct: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const result = await productService.deleteProduct(id);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default productController;
