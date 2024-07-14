import { CommonProps } from './common';
import { FeatureProduct, TypeProduct } from './enum';
import { IImage } from './image';

export interface IProduct extends CommonProps {
    name: string;
    price: number;
    sale: number;
    weight: number;
    desc: string;
    content: string;
    quantity: number;
    mfg: string;
    exp: string;
    type: TypeProduct;
    feature: FeatureProduct;
    image: Array<IImage>;
}
