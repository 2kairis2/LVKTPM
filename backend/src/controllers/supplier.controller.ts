import { Request, Response } from 'express';
import { convertError, convertPaginateResponse, getQueriesPaginate, convertDataResponse } from '~/helper';
import Supplier from '~/models/supplier';

const supplierController = {
    getSuppliers: async (req: Request, res: Response) => {
        try {
            const { page, includes, limit, skip, query, sort } = getQueriesPaginate(req.query, 'SUPPLIER');

            const supplier = await Supplier.find(query).sort(sort).skip(skip).limit(limit).populate(includes);

            const paginateData = await convertPaginateResponse({
                model: Supplier,
                data: supplier,
                query,
                page,
                limit,
            });

            res.status(200).json(paginateData);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },
    getSupplierById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const supplier = await Supplier.findById(id);

            if (!supplier) {
                return res.status(404).json({
                    message: 'Không tìm thấy nhà cung cấp',
                });
            }

            res.status(200).json(convertDataResponse(supplier));
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },
    createSupplier: async (req: Request, res: Response) => {
        try {
            const supplier = new Supplier(req.body);
            await supplier.save();
            res.status(200).json(convertDataResponse(supplier));
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },
    updateSupplier: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const supplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(convertDataResponse(supplier));
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },
    deleteSupplier: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const supplier = await Supplier.findByIdAndDelete(id);
            if (!supplier) {
                return res.status(404).json({
                    message: 'Không tìm thấy nhà cung cấp',
                });
            }
            res.status(200).json({
                message: 'Xóa nhà cung cấp thành công',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: convertError(error),
            });
        }
    },

    findById: async (id: string) => {
        try {
            const role = await Supplier.findById(id);
            return role;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

export default supplierController;
