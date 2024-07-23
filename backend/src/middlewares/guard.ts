import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { IPermission, UserToken, HttpStatus } from '../types';
import { handleError } from '~/helper';

const getToken = (req: Request) => {
    const access_token = req.cookies['access_token'];
    if (!access_token) return null;
    const token = access_token.split(' ')[1];
    const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || 'secret';
    const tokenDecode = jwt.verify(token, SECRET_KEY) as UserToken | null;
    return tokenDecode;
};

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token) {
        return handleError({ message: 'Chưa xác thực', status: HttpStatus.UNAUTHORIZED }, res);
    }
    req.user = token;
    next();
};

export const validatePermission =
    (permission: IPermission) => async (req: Request, res: Response, next: NextFunction) => {
        const token = getToken(req);
        if (!token) {
            return handleError({ message: 'Chưa xác thực', status: HttpStatus.UNAUTHORIZED }, res);
        }

        const { role } = token;
        req.user = token;

        // Allow user to access their own data
        if (req.params.id === token._id) {
            return next();
        }

        // Check if user has permission
        if (!role) {
            return handleError({ message: 'Không có quyền truy cập', status: HttpStatus.FORBIDDEN }, res);
        }

        // Allow admin to access all data
        if (role.name === 'admin') {
            return next();
        }

        if (!role.permissions.includes(permission)) {
            return handleError({ message: 'Không có quyền truy cập', status: HttpStatus.FORBIDDEN }, res);
        }

        return next();
    };
