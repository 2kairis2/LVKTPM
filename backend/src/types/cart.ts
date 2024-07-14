import { IProduct } from './product';

export interface ICart {
    user: any;
    items: Array<ICartItem>;
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
}
