import { Request, Response } from 'express';
import Role from '~/models/role';

const roleController = {
    getRoles: async (req: Request, res: Response) => {
        try {
            const roles = await Role.find();
            res.status(200).json({
                roles,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    getRoleById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const role = await Role.findById(id);
            res.status(200).json({
                role,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    createRole: async (req: Request, res: Response) => {
        try {
            const role = new Role(req.body);
            await role.save();
            res.status(200).json({
                role,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    updateRole: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const role = await Role.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({
                role,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    deleteRole: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const role = await Role.findByIdAndDelete(id);
            if (!role) {
                return res.status(404).json({
                    message: 'Không tìm thấy vai trò',
                });
            }
            res.status(200).json({
                message: 'Xóa vai trò thành công',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },

    findById: async (id: string) => {
        try {
            const role = await Role.findById(id);
            return role;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

export default roleController;
