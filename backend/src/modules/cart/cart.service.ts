import Cart from './cart.model';
import { CustomError } from '~/helper';
import { HttpStatus, StringOrObjectId } from '~/types';

const cartService = {
    createCart: async (userId: StringOrObjectId) => {
        const cart = new Cart({
            user: userId,
            products: [],
        });
        return cart.save();
    },
    addToCart: async (userId: StringOrObjectId, data: any) => {
        let cart = await Cart.findOne({
            user: userId,
        });

        if (!cart) {
            cart = await cartService.createCart(userId);
        }

        for (const product of data.products) {
            const index = cart.products.findIndex(
                (product) => product.product.toString() === product.product.toString(),
            );

            if (index !== -1) {
                cart.products[index].quantity += product.quantity;
            } else {
                cart.products.push(product);
            }
        }

        return cart.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await Cart.countDocuments(query);
        return count;
    },
    getMyCart: async (userId: StringOrObjectId) => {
        let cart = await Cart.findOne({
            user: userId,
        });
        if (!cart) {
            cart = await cartService.createCart(userId);
        }
        return cart;
    },
    updateCart: async (userId: StringOrObjectId, data: any) => {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            throw new CustomError('Cart không tìm thấy', HttpStatus.NOT_FOUND);
        }

        for (const product of data.products) {
            const index = cart.products.findIndex(
                (product) => product.product.toString() === product.product.toString(),
            );

            if (index !== -1) {
                cart.products[index].quantity = product.quantity;
            }
        }

        return cart.save();
    },
    deleteProductInCart: async (userId: StringOrObjectId, productId: StringOrObjectId) => {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            throw new CustomError('Cart không tìm thấy', HttpStatus.NOT_FOUND);
        }

        const index = cart.products.findIndex((product) => product.product.toString() === productId.toString());
        if (index === -1) {
            throw new CustomError('Sản phẩm không tìm thấy trong giỏ hàng', HttpStatus.NOT_FOUND);
        }
        cart.products.splice(index, 1);
        return cart.save();
    },
    deleteManyProduct: async (userId: StringOrObjectId, productIds: Array<StringOrObjectId>) => {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new CustomError('Cart không tìm thấy', HttpStatus.NOT_FOUND);
        }
        cart.products = cart.products.filter((product) => !productIds.includes(product.product.toString())) as any;
        return cart.save();
    },
};

export default cartService;
