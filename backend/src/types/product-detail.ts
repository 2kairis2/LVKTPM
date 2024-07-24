import { StringOrObjectId, IProduct, IInventoryReceipt } from '~/types';

export interface IProductDetail {
    product: StringOrObjectId | IProduct;
    receipt?: StringOrObjectId | IInventoryReceipt;
    sold?: boolean;
    soldAt?: Date;
    sale?: number;
    producedAt?: Date;
}
