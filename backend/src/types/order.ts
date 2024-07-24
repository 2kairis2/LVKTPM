import { BaseProps, StringOrObjectId } from '~/types';

export interface IOrder extends BaseProps {
    user: StringOrObjectId;
    items: Array<{
        product: StringOrObjectId;
    }>;
    shipping_address: string;
    payment_method: number;
    payment_info?: string;
    status: number;
    total_price: number;
    note?: string;
}
