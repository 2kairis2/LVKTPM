import { IImage } from './image';
import { ICategory, IType, BaseProps } from '~/types';

export interface IProduct extends BaseProps {
    title: string;
    slug: string;
    price: number;
    sale: number;
    weight: number;
    desc: string;
    content: string;
    quantity: number;
    type: IType;
    category: ICategory;
    image: Array<IImage>;
    expired: number;
}
