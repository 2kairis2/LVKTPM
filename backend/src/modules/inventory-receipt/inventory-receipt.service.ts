import InventoryReceipt from './inventory-receipt.model';
import { CustomError } from '~/helper';
import productDetailService from '~/modules/product-detail/product-detail.service';
import productService from '~/modules/product/product.service';
import { HttpStatus, IInventoryReceipt, StatusInventoryReceipt, StatusProduct, StringOrObjectId } from '~/types';

const inventoryReceiptService = {
    createInventoryReceipt: async (data: IInventoryReceipt, userId: StringOrObjectId) => {
        await inventoryReceiptService.validateValue(data);
        const inventoryReceipt = new InventoryReceipt({
            ...data,
            staff: userId,
        });
        return inventoryReceipt.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await InventoryReceipt.countDocuments(query);
        return count;
    },
    getInventoryReceipt: async ({
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
        const inventoryReceipts = await InventoryReceipt.find(query)
            .skip(skip)
            .limit(limit)
            .populate(includes)
            .sort(sort);

        return inventoryReceipts;
    },

    getInventoryReceiptById: async (id: string, includes: string | Array<string> = '') => {
        const inventoryReceipt = await InventoryReceipt.findById(id).populate(includes);

        if (!inventoryReceipt) {
            throw new CustomError('InventoryReceipt không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return inventoryReceipt;
    },

    updateInventoryReceipt: async (id: string, data: IInventoryReceipt) => {
        await inventoryReceiptService.validateValue(data);

        const inventoryReceipt = await InventoryReceipt.findById(id);

        if (!inventoryReceipt) {
            throw new CustomError('InventoryReceipt không tồn tại', HttpStatus.NOT_FOUND);
        }

        if (inventoryReceipt.status === StatusInventoryReceipt.DONE) {
            throw new CustomError('Không thể cập nhật phiếu đã hoàn thành', HttpStatus.BAD_REQUEST);
        }

        inventoryReceipt.set(data);

        if (data?.status === StatusInventoryReceipt.DONE) {
            inventoryReceipt.importedAt = new Date();
            for (const item of data.products) {
                await productService.updateProduct(item.product, {
                    status: StatusProduct.AVAILABLE,
                });
                for (let i = 0; i < item.quantity; i++) {
                    await productDetailService.createProductDetail({
                        product: item.product,
                        receipt: inventoryReceipt._id,
                        producedAt: item.producedAt,
                    });
                }
            }
        }

        return inventoryReceipt.save();
    },

    deleteInventoryReceipt: async (id: string) => {
        const inventoryReceipt = await InventoryReceipt.findById(id);

        if (!inventoryReceipt) {
            throw new CustomError('InventoryReceipt không tìm thấy', HttpStatus.NOT_FOUND);
        }

        if (inventoryReceipt.status === StatusInventoryReceipt.DONE) {
            throw new CustomError('Không thể xóa phiếu đã hoàn thành', HttpStatus.BAD_REQUEST);
        }

        await InventoryReceipt.findByIdAndDelete(id);

        return inventoryReceipt;
    },

    validateValue: async (data: IInventoryReceipt) => {
        let totalPrice = 0;
        let totalQuantity = 0;
        for (const item of data.products) {
            const product = await productService.getProductById(item.product);
            if (!product) {
                throw new CustomError(`Sản phẩm ${item.product} không tồn tại`, HttpStatus.NOT_FOUND);
            }
            totalQuantity += item.quantity;
            totalPrice += product.sale * item.quantity;
        }

        if (totalQuantity !== data.total_quantity) {
            throw new CustomError('Số lượng sản phẩm không đồng bộ', HttpStatus.BAD_REQUEST);
        }

        if (totalPrice !== data.total_price) {
            throw new CustomError('Tổng giá sản phẩm không đồng bộ', HttpStatus.BAD_REQUEST);
        }
    },
};

export default inventoryReceiptService;
