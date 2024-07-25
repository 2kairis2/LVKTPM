import { StringOrObjectId } from '~/types/common';
import { ETypeDiscount } from '~/types/enum';

export interface IDiscount {
    _id: StringOrObjectId;
    title: string;
    type: ETypeDiscount;
    value: number;
    startAt: Date;
    endAt: Date;
}
