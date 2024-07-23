import Supplier from './supplier.model';
import { CustomError } from '~/helper';
import { HttpStatus } from '~/types';

const supplierService = {
    createSupplier: async (data: any) => {
        const supplier = new Supplier(data);
        return supplier.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await Supplier.countDocuments(query);
        return count;
    },
    getSupplier: async ({
        limit = 10,
        sort = '-createdAt',
        skip = 0,
        query = {},
        includes = '',
    }: {
        limit?: number;
        sort?: string | Record<string, any>;
        skip?: number;
        query?: Record<string, any>;
        includes?: string | Array<string>;
    }) => {
        const suppliers = await Supplier.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return suppliers;
    },

    getSupplierById: async (id: string, includes: string | Array<string> = '') => {
        const supplier = await Supplier.findById(id).populate(includes);

        if (!supplier) {
            throw new CustomError('Nhà cung cấp không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return supplier;
    },

    updateSupplier: async (id: string, data: any) => {
        const supplier = await Supplier.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!supplier) {
            throw new CustomError('Supplier không tồn tại', HttpStatus.NOT_FOUND);
        }

        return supplier;
    },

    deleteSupplier: async (id: string) => {
        const supplier = await Supplier.findByIdAndDelete(id);

        if (!supplier) {
            throw new CustomError('Nhà cung cấp không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return supplier;
    },
};

export default supplierService;
