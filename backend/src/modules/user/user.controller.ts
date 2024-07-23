import { Request, Response } from 'express';
import { HttpStatus } from '~/types';

import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
import userService from './user.service';

const userController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await userService.createUser(data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getUser: async (req: Request, res: Response) => {
        try {
            const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query);

            const result = await userService.getUser({
                limit,
                query,
                sort,
                skip,
                includes,
            });
            const total = await userService.countDocuments(query);

            return responseWithPagination({ res, data: result, total, page, limit });
        } catch (error) {
            handleError(error, res);
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query;

            const result = await userService.getUserById(id, includes as string | Array<string>);

            if (!result) {
                return handleError({ message: 'Không tìn thấy người dùng', status: HttpStatus.NOT_FOUND }, res);
            }

            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    getMe: async (req: Request, res: Response) => {
        try {
            const { user } = req;
            const result = await userService.getUserById(user._id, 'role');
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await userService.updateUser(id, data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default userController;
