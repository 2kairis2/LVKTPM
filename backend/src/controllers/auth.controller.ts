import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { convertError } from '~/helper';

function generateToken(data: any, exp = '1d') {
    const secretKey = process.env.ACCESS_TOKEN_SECRET || 'token';
    return `Bearer ${jwt.sign(data, secretKey, { expiresIn: exp })}`;
}

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { password, email, fullname } = req.body;

            if ([password, email, fullname].includes(undefined)) {
                return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
            }

            const exitingUser = await User.findOne({ email });
            if (exitingUser) {
                return res.status(409).json({ message: 'Người dùng đã tồn tại' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const new_user = new User({
                password: hashedPassword,
                email,
                fullname,
            });

            await new_user.save();

            return res
                .status(201)
                .json({ message: 'Đăng ký người dùng thành công', user: { ...new_user.toObject(), password: '' } });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email: email }).populate('role');

            if (!user) {
                return res.status(400).json({ message: 'Tài khoản chưa đăng ký.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Mật khẩu không đúng' });
            }

            const token = generateToken({
                _id: user._id,
                email: user.email,
                role: user.role,
            });

            res.cookie('access_token', token, {
                httpOnly: true,
                sameSite: true,
            });

            return res.status(200).send({
                access_token: token,
                user: {
                    ...user.toObject(),
                    password: '',
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
};

export default authController;
