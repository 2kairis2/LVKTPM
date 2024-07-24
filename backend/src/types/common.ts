import mongoose from 'mongoose';

export interface BaseProps {
    _id: StringOrObjectId;
    createdAt: string;
    updatedAt: string;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export interface RequestQuery {
    limit?: number;
    page?: number;
    sort?: string;
    order?: string;
    includes?: string;
    file?: any;
    [key: string]: any;
}

export type StringOrObjectId = string | mongoose.Types.ObjectId;
