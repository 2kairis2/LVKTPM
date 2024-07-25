import { areUniqueValues, CustomError } from '~/helper';
import Product from './product.model';
import { HttpStatus, StringOrObjectId, IProduct, IDiscount, ETypeDiscount, EStatusDiscount } from '~/types';
import discountService from '~/modules/discount/discount.service';

const productService = {
    createProduct: async (data: IProduct) => {
        const uniqueValue = await areUniqueValues(Product, {
            title: data.title,
            slug: data.slug,
        });

        if (uniqueValue.title) {
            throw new CustomError('Title đã tồn tại', HttpStatus.BAD_REQUEST);
        }

        if (uniqueValue.slug) {
            throw new CustomError('Slug đã tồn tại', HttpStatus.BAD_REQUEST);
        }

        const product = new Product({
            ...data,
            sale: data?.sale || data.price,
        });
        return product.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await Product.countDocuments(query);
        return count;
    },
    getProduct: async ({
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
        const products = await Product.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return products;
    },
    getProductById: async (id: StringOrObjectId, includes: string | Array<string> = '') => {
        const product = await Product.findById(id).populate(includes);

        if (!product) {
            throw new CustomError('Sản phẩm không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return product;
    },
    updateProduct: async (id: StringOrObjectId, data: any) => {
        const product = await Product.findById(id);

        if (!product) {
            throw new CustomError('Sản phẩm không tồn tại', HttpStatus.NOT_FOUND);
        }

        if (data.discount) {
            const discount = await discountService.getDiscountById(data.discount);

            if (!discount) {
                throw new CustomError('Mã giảm giá không tồn tại', HttpStatus.NOT_FOUND);
            }

            if (discount.status === EStatusDiscount.EXPIRED || discount.status === EStatusDiscount.CANCEL) {
                throw new CustomError('Mã giảm giá đã hết hạn hoặc bị huỷ', HttpStatus.BAD_REQUEST);
            }

            if (discount.status === EStatusDiscount.INACTIVE) {
                product.sale = calculateSale(product, discount);
            }
        } else {
            product.sale = product.price;
            product.discount = null;
        }

        product.set(data);

        return product.save();
    },
    asyncPriceProduct: async (discounts: Array<IDiscount>, type: 'ACTIVE' | 'REMOVE' = 'ACTIVE') => {
        for (const discount of discounts) {
            const products = await Product.find({ discount: discount._id });

            for (const product of products) {
                if (type === 'ACTIVE') {
                    product.sale = calculateSale(product, discount);
                } else {
                    product.sale = product.price;
                    product.discount = null;
                }

                await product.save();
            }
        }
    },
    deleteProduct: async (id: StringOrObjectId) => {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw new CustomError('Sản phẩm không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return product;
    },
};

function calculateSale(product: IProduct, discount: IDiscount) {
    if (discount.type === ETypeDiscount.PERCENT) {
        return product.price - (product.price * discount.value) / 100;
    }
    const price = product.price - discount.value;
    return price > 0 ? price : 0;
}

export default productService;
