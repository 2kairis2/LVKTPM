import { IImage } from './image';
import { ICategory, IType, IDiscount, StringOrObjectId, StatusProduct } from '~/types';

export interface IProduct {
    _id: StringOrObjectId;
    title: string;
    slug: string;
    price: number;
    sale: number;
    weight?: number | null;
    desc?: string | null;
    content?: string | null;
    discount?: IDiscount | null | StringOrObjectId;
    type?: IType | StringOrObjectId | null;
    category?: ICategory | StringOrObjectId | null;
    images: Array<IImage | StringOrObjectId>;
    status: StatusProduct;
    expired: number;
}
