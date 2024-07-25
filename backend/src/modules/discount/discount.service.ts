import Discount from './discount.model';
import { CustomError } from '~/helper';
import productService from '~/modules/product/product.service';
import { EStatusDiscount, HttpStatus, StringOrObjectId } from '~/types';

const discountService = {
    createDiscount: async (data: any) => {
        const discount = new Discount(data);
        return discount.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await Discount.countDocuments(query);
        return count;
    },
    getDiscount: async ({
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
        const discounts = await Discount.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return discounts;
    },

    getDiscountById: async (id: StringOrObjectId, includes: string | Array<string> = '') => {
        const discount = await Discount.findById(id).populate(includes);

        if (!discount) {
            throw new CustomError('Discount không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return discount;
    },

    updateDiscount: async (id: StringOrObjectId, data: any) => {
        const discount = await Discount.findById(id);

        if (!discount) {
            throw new CustomError('Discount không tồn tại', HttpStatus.NOT_FOUND);
        }

        if (discount.status === EStatusDiscount.CANCEL || discount.status === EStatusDiscount.EXPIRED) {
            throw new CustomError('Discount đã hết hạn hoặc đã hủy', HttpStatus.BAD_REQUEST);
        }

        if (data.status === EStatusDiscount.CANCEL) {
            await productService.asyncPriceProduct([discount], 'REMOVE');
        }

        discount.set(data);

        return discount.save();
    },

    asyncDiscount: async () => {
        const discountEarlyActive = await Discount.find({
            status: EStatusDiscount.NOT_ACTIVE,
            startAt: { $lte: new Date() },
        });
        const discountEarlyExpired = await Discount.find({
            status: EStatusDiscount.INACTIVE,
            endAt: { $lt: new Date() },
        });

        for (const discount of discountEarlyActive) {
            await Discount.findByIdAndUpdate(discount._id, { status: EStatusDiscount.INACTIVE });
        }

        for (const discount of discountEarlyExpired) {
            await Discount.findByIdAndUpdate(discount._id, { status: EStatusDiscount.EXPIRED });
        }

        return { discountEarlyActive, discountEarlyExpired };
    },

    deleteDiscount: async (id: StringOrObjectId) => {
        const discount = await Discount.findByIdAndDelete(id);

        if (!discount) {
            throw new CustomError('Discount không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return discount;
    },
};

export default discountService;
