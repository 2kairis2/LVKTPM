import { IProductDetail, StringOrObjectId } from '~/types';
import ProductDetail from './product-detail.model';
import productService from '~/modules/product/product.service';

function calculateExpiredDate(date: Date, expiredDate: number) {
    const expired = new Date(date);
    expired.setDate(expired.getDate() + expiredDate);
    return expired;
}

const productDetailService = {
    createProductDetail: async (data: IProductDetail) => {
        const product = await productService.getProductById(data.product as string);

        const productDetail = new ProductDetail({
            ...data,
            expiredAt: calculateExpiredDate(data.producedAt as Date, product.expired),
        });
        return productDetail.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await ProductDetail.countDocuments(query);
        return count;
    },
    getProductDetail: async ({
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
        const productDetails = await ProductDetail.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return productDetails;
    },

    getProductDetailById: async (id: StringOrObjectId, includes: string | Array<string> = '') => {
        const productDetail = await ProductDetail.findById(id).populate(includes);
        return productDetail;
    },

    updateProductDetail: async (id: StringOrObjectId, data: any) => {
        const productDetail = await ProductDetail.findByIdAndUpdate(id, data, {
            new: true,
        });
        return productDetail;
    },

    deleteProductDetail: async (id: StringOrObjectId) => {
        const productDetail = await ProductDetail.findByIdAndDelete(id);
        return productDetail;
    },
};

export default productDetailService;
