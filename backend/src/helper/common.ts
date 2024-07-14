import { Document, Model } from 'mongoose';

export function createSlug(str: string) {
    str = str.replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/Đ/g, 'D');
    str = str.normalize('NFD');
    str = str.replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/[^a-zA-Z0-9 ]/g, '');
    str = str.trim();
    str = str.toLocaleLowerCase().replace(/ +/g, '-');
    return str;
}

export const convertError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'Internal server error';
};

export const convertPaginateResponse = async (
    model: Model<Document & any>,
    data: any,
    query: Record<string, any>,
    page: number,
    limit: number,
) => {
    const total = await model.countDocuments(query);

    return {
        data: data,
        meta: {
            page,
            limit,
            total,
        },
    };
};

export const convertDataResponse = (data: any, message: string = 'Successful') => {
    return {
        data: data,
        message,
    };
};
