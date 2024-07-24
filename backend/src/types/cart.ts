import { IUser } from '~/types/user';
import { IProduct } from './product';
import { StringOrObjectId } from '~/types/common';

export interface ICart {
    user: IUser | StringOrObjectId;
    products: Array<ICartItem>;
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
}
