import { areUniqueValues, CustomError } from '~/helper';
import Product from './product.model';
import { HttpStatus } from '~/types';
import { IProduct } from '~/types/product';

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

    getProductById: async (id: string, includes: string | Array<string>) => {
        const product = await Product.findById(id).populate(includes);

        if (!product) {
            throw new CustomError('Sản phẩm không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return product;
    },

    updateProduct: async (id: string, data: any) => {
        const product = await Product.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!product) {
            throw new CustomError('Sản phẩm không tồn tại', HttpStatus.NOT_FOUND);
        }

        return product;
    },

    deleteProduct: async (id: string) => {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw new CustomError('Sản phẩm không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return product;
    },
};

export default productService;
