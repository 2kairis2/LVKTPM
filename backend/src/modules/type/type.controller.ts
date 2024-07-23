import { Request, Response } from 'express';

        import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
        import typeService from './type.service';
        
        const typeController = {
            createType: async (req: Request, res: Response) => {
                try {
                    const data = req.body;
                    const result = await typeService.createType(data);
                    return responseWithData({ res, data: result });
                } catch (error) {
                    handleError(error, res);
                }
            },

            getType: async (req: Request, res: Response) => {
                try {
                    const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query)

                    const result = await typeService.getType({
                        limit,
                        query,
                        sort,
                        skip,
                        includes,
                    });
                    const total = await typeService.countDocuments(query);

                    return responseWithPagination({ res, data: result, total, page, limit });
                } catch (error) {
                    handleError(error, res);
                }
            },

            getTypeById: async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;
                    const { includes } = req.query;

                    const result = await typeService.getTypeById(id, includes as string | Array<string>);
                    return responseWithData({ res, data: result });
                } catch (error) {
                    handleError(error, res);
                }
            },

            updateType: async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;
                    const data = req.body;

                    const result = await typeService.updateType(id, data);
                    return responseWithData({ res, data: result });
                } catch (error) {
                    handleError(error, res);
                }
            },

            deleteType: async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;

                    const result = await typeService.deleteType(id);
                    return responseWithData({ res, data: result });
                }
                catch (error) {
                    handleError(error, res);
                }
            },
        }
            
        export default typeController;