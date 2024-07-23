import { Request, Response } from 'express';

import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
import roleService from './role.service';

const roleController = {
    createRole: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await roleService.createRole(data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getRole: async (req: Request, res: Response) => {
        try {
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query);

            const result = await roleService.getRole({
                limit,
                query,
                sort,
                skip,
                includes,
            });
            const total = await roleService.countDocuments(query);

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getRoleById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query;

            const result = await roleService.getRoleById(id, includes as string | Array<string>);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateRole: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await roleService.updateRole(id, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    deleteRole: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const result = await roleService.deleteRole(id);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default roleController;
