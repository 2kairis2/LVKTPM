import { Request, Response } from 'express';

        import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
        import productDetailService from './product-detail.service';
        
        const productDetailController = {
            createProductDetail: async (req: Request, res: Response) => {
                try {
                    const data = req.body;
                    const result = await productDetailService.createProductDetail(data);
                    return responseWithData({ res, data: result });
                } catch (error) {
                    handleError(error, res);
                }
            },

            getProductDetail: async (req: Request, res: Response) => {
                try {
                    const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query)

                    const result = await productDetailService.getProductDetail({
                        limit,
                        query,
                        sort,
                        skip,
                        includes,
                    });
                    const total = await productDetailService.countDocuments(query);

                    return responseWithPagination({ res, data: result, total, page, limit });
                } catch (error) {
                    handleError(error, res);
                }
            },

            getProductDetailById: async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;
                    const { includes } = req.query;

                    const result = await productDetailService.getProductDetailById(id, includes as string | Array<string>);
                    return responseWithData({ res, data: result });
                } catch (error) {
                    handleError(error, res);
                }
            },

            updateProductDetail: async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;
                    const data = req.body;

                    const result = await productDetailService.updateProductDetail(id, data);
                    return responseWithData({ res, data: result });
                } catch (error) {
                    handleError(error, res);
                }
            },

            deleteProductDetail: async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;

                    const result = await productDetailService.deleteProductDetail(id);
                    return responseWithData({ res, data: result });
                }
                catch (error) {
                    handleError(error, res);
                }
            },
        }
            
        export default productDetailController;