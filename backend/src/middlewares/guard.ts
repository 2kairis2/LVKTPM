import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { IPermission, UserToken } from '../types';
import roleController from '~/controllers/role.controller';

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const cookieToken = req.cookies['access_token'];

    if (!cookieToken) return res.status(401).json({ message: 'Unauthorized' });

    const token = cookieToken.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || 'secret';

    const tokenDecode = jwt.verify(token, SECRET_KEY) as UserToken | null;
    if (!tokenDecode) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = tokenDecode;
    next();
};

export const authentication = (permission: IPermission) => async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if (req.params.id === req.user._id) {
        return next();
    }

    if (!role) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    if (role.name === 'admin') {
        return next();
    }

    const rolePermissions = await roleController.findById(role._id);

    if (!rolePermissions?.permissions?.includes(permission)) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
};
