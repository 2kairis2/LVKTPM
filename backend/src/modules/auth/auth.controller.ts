import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { handleError, responseWithData } from '~/helper';
import authService from './auth.service';

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await authService.register(data);
            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const result = await authService.login({
                email,
                password,
            });

            const access_token = generateToken({ email: result.email, role: result.role, _id: result._id });

            res.cookie('access_token', access_token, {
                httpOnly: true,
                sameSite: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            });

            return responseWithData({ res, data: result });
        } catch (error) {
            handleError(error, res);
        }
    },
};

function generateToken(data: any, exp = '1d') {
    const secretKey = process.env.ACCESS_TOKEN_SECRET || 'token';
    return `Bearer ${jwt.sign(data, secretKey, { expiresIn: exp })}`;
}

export default authController;
