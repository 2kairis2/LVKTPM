import { StringOrObjectId, BaseProps, StatusInventoryReceipt } from '~/types';

export interface IInventoryReceipt extends BaseProps {
    note?: string;
    total_price: number;
    total_quantity: number;
    products: Array<IItem>;
    supplier: StringOrObjectId;
    status?: StatusInventoryReceipt;
}

interface IItem {
    product: StringOrObjectId;
    quantity: number;
    producedAt: Date;
}
