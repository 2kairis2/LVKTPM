import { Request, Response } from 'express';

import Product from '../models/product';
import {
    areUniqueValues,
    convertDataResponse,
    convertError,
    convertPaginateResponse,
    getQueriesPaginate,
} from '../helper';
import { ICartItem, RequestQuery } from '../types';
import { IProduct } from '~/types/product';

const productController = {
    getProductById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query as RequestQuery;
            const data = await Product.findById(id).populate(includes ? includes.split(',') : []);
            if (!data) {
                return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            }
            return res.status(200).json(convertDataResponse(data));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getProducts: async (req: Request, res: Response) => {
        try {
            const { limit, page, sort, skip, query, includes } = getQueriesPaginate(req.query);

            const products = await Product.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

            const paginateData = await convertPaginateResponse(Product, products, query, page, limit);

            return res.status(200).json(paginateData);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    createProduct: async (req: Request, res: Response) => {
        try {
            const uniqueResults = await areUniqueValues<IProduct>(Product, {
                slug: req.body.slug,
                name: req.body.name,
            });
            if (uniqueResults.slug) return res.status(400).json({ message: 'Slug đã tồn tại' });
            if (uniqueResults.name) return res.status(400).json({ message: 'Tên sản phẩm đã tồn tại' });

            const createdProduct = new Product(req.body);
            await createdProduct.save();
            return res.status(201).json(convertDataResponse(createdProduct, 'Tạo sản phẩm thành công'));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },
    updateProduct: async (req: Request, res: Response) => {
        try {
            const existProduct = await Product.findById(req.params.id);
            const existSlug = await Product.findOne({ slug: req.body.slug });
            if (!existProduct) {
                return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            }
            if (existSlug && existSlug._id.toString() !== req.params.id) {
                return res.status(400).json({ message: 'Slug đã tồn tại' });
            }
            existProduct.set(req.body);
            await existProduct.save();
            return res.status(201).json(convertDataResponse(existProduct, 'Cập nhật sản phẩm thành công'));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'update product server error' });
        }
    },
    deleteProduct: async (req: Request, res: Response) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            return res.status(204).json({ message: 'Xóa sản phẩm thành công' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: convertError(error) });
        }
    },

    reduceQuantity: async (items: Array<ICartItem>) => {
        for (const item of items) {
            try {
                const product = await Product.findById(item.product._id || item.product);

                if (!product) {
                    throw new Error('Không tìm thấy sản phẩm');
                }

                if (product.quantity < item.quantity) {
                    throw new Error('Số lượng sản phẩm này không đủ');
                }

                product.quantity -= item.quantity;

                await product.save();
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    },
    addQuantity: async (items: Array<ICartItem>) => {
        try {
            for (const item of items) {
                const product = await Product.findById(item.product._id || item.product);
                if (!product) {
                    return;
                }
                product.quantity = product.quantity + item.quantity;
                await product.save();
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default productController;
