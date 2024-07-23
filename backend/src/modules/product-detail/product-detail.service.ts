import ProductDetail from './product-detail.model';

        const productDetailService = {    
            createProductDetail: async (data: any) => {
                const productDetail = new ProductDetail(data);
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

            getProductDetailById: async (id: string, includes: string | Array<string>) => {
                const productDetail = await ProductDetail.findById(id).populate(includes);
                return productDetail;
            },

            updateProductDetail: async (id: string, data: any) => {
                const productDetail = await ProductDetail.findByIdAndUpdate(id, data, {
                    new: true,
                });
                return productDetail;
            },
            
            deleteProductDetail: async (id: string) => {
                const productDetail = await ProductDetail.findByIdAndDelete(id);
                return productDetail;
            },
        }
            
        export default productDetailService;