import { Request, Response } from 'express';

import Product from '../models/product';
import { createQueries, convertSort, convertIncludes } from '../helper';
import { ICartItem, RequestQuery } from '../types';

const productController = {
    getProductById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { includes } = req.query as RequestQuery;
            const data = await Product.findById(id).populate(includes ? includes.split(',') : []);
            if (!data) {
                return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            }
            return res.status(200).json({ data: data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getProductBySlug: async (req: Request, res: Response) => {
        try {
            const { slug } = req.params;
            const { includes } = req.query as RequestQuery;
            const data = await Product.findOne({
                slug,
            }).populate(includes ? includes.split(',') : []);
            if (!data) {
                return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            }
            return res.status(200).json({ data: data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getProducts: async (req: Request, res: Response) => {
        try {
            const { limit = 20, page = 1, sort = 'price:desc' } = req.query;

            const query = createQueries(req.query);
            const sortFormatted = convertSort({ sort });
            const includesFormatted = convertIncludes(req.query);

            const products = await Product.find(query)
                .skip((+page - 1) * +limit)
                .limit(+limit)
                .populate(includesFormatted)
                .sort(sortFormatted);
            const totalPage = await Product.countDocuments(query);

            return res.status(200).json({
                data: products,
                meta: {
                    page,
                    limit,
                    totalPage,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    createProduct: async (req: Request, res: Response) => {
        try {
            const { name, desc, quantity, weight, price, slug, exp, type, content, feature, images } = req.body;

            const createdProduct = new Product({
                name,
                slug,
                content,
                desc,
                quantity,
                weight,
                price,
                exp,
                type,
                feature,
            });

            createdProduct.images.push(images);

            await createdProduct.save();

            return res.status(201).json({ data: createdProduct });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateProduct: async (req: Request, res: Response) => {
        try {
            const { name, desc, quantity, weight, exp, type, content, feature } = req.body;

            const existProduct = await Product.findById(req.params.id);

            if (!existProduct) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

            existProduct.name = name || existProduct.name;
            existProduct.desc = desc || existProduct.desc;
            existProduct.content = content || existProduct.content;
            existProduct.quantity = quantity || existProduct.quantity;
            existProduct.weight = weight || existProduct.weight;

            existProduct.exp = exp || existProduct.exp;
            existProduct.type = type || existProduct.type;
            existProduct.feature = feature || existProduct.feature;
            existProduct.images = req.body.images || existProduct.images;

            await existProduct.save();

            return res.status(201).json({ data: existProduct });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'update product server error' });
        }
    },
    deleteProduct: async (req: Request, res: Response) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            return res.sendStatus(204);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
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
