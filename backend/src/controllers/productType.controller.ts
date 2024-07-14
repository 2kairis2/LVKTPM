import { Request, Response } from 'express';

import ProductType from '../models/productType';
import { convertError } from '../helper';

const productTypeController = {
    createProductType: async (req: Request, res: Response) => {
        try {
            const productTypeData = req.body;

            const newProductType = await ProductType.create(productTypeData);

            return res.status(201).json({
                newProductType,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
    getProductTypes: async (req: Request, res: Response) => {
        try {
            const data = await ProductType.findOne();
            return res.status(200).json({ data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
    getProductTypeById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await ProductType.findById(id);
            return res.status(200).json({ data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
    updateProductType: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;

            const updatedProductType = await ProductType.findByIdAndUpdate(id, updatedData, {
                new: true,
            });

            if (!updatedProductType) {
                return res.status(404).json({ message: 'Loại sản phẩm không được tìm thấy' });
            }
            return res.status(200).json({
                message: 'Cập nhật loại sản phẩm thành công',
                updatedProductType,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },

    deleteProductType: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const deletedProductType = await ProductType.findByIdAndDelete(id);

            if (!deletedProductType) {
                return res.status(404).json({ message: 'Loại sản phẩm không được tìm thấy' });
            }

            return res.status(200).json({
                message: 'Xoá sản phẩm thành công',
                deletedProductType,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
};

export default productTypeController;
