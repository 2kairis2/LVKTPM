import User from '../models/user';

import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { convertError } from '../helper';

const productController = {
    getUserById: async (req: Request, res: Response) => {
        try {
            const { id: userId } = req.params;
            if (!userId) res.status(400).json({ message: 'Không có id người dùng' });
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            return res.status(200).json({
                user,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getMe: async (req: Request, res: Response) => {
        try {
            const { _id: userId } = req.user;
            if (!userId) res.status(400).json({ message: 'Không có id người dùng' });

            const data = await User.findOne({ _id: userId });
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUsers: async (req: Request, res: Response) => {
        try {
            const users = await User.find();
            return res.status(200).json({
                data: users,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateUserById: async (req: Request, res: Response) => {
        try {
            const { _id: userId } = req.user;
            const updatedData = req.body;
            const user = await User.findByIdAndUpdate(userId, updatedData, {
                new: true,
            });
            return res.status(200).json({
                message: 'Cập nhật thông tin thành công',
                data: user,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
    changePassword: async (req: Request, res: Response) => {
        try {
            const { email, oldPassword, newPassword } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Tài khoản không tồn tại.' });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (isMatch) {
                return res.status(401).json({ message: 'Mật khẩu cũ không chính xác.' });
            }

            user.password = newPassword;
            await user.save();

            return res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công.' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: convertError(error) });
        }
    },
};

export default productController;
