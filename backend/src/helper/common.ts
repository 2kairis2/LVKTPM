import { Response } from 'express';
import { CustomError } from '~/helper/customError';
import { HttpStatus } from '~/types';

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

interface IError {
    status: number;
    message: string;
}
export const handleError = (error: unknown | IError, res: Response) => {
    if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message, error });
    }

    if (error instanceof Error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server', error });
    }

    if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
        return res.status(error.status as number).json({ message: error.message, error });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Lỗi server', error });
};

interface IConvertPaginateResponse {
    res: Response;
    data: any;
    total: number;
    page: number;
    limit: number;
}
export const responseWithPagination = ({ res, total, data, page, limit }: IConvertPaginateResponse) => {
    return res.status(HttpStatus.OK).json({
        data,
        meta: {
            page,
            limit,
            total,
        },
    });
};

export const convertDataResponse = (data: any, message: string = 'Successful') => {
    return {
        data: data,
        message,
    };
};

interface IResponseWithData {
    res: Response;
    data: any;
    status?: HttpStatus | number;
    message?: string;
}
export const responseWithData = ({ res, data, status = HttpStatus.OK, message = 'Thành công' }: IResponseWithData) => {
    return res.status(status).json({ data, message });
};

interface IResponseWithMessage {
    res: Response;
    status?: HttpStatus | number;
    message?: string;
}
export const responseWithMessage = ({ res, status = HttpStatus.OK, message }: IResponseWithMessage) => {
    return res.status(status).json({ message });
};

export function parsePascalCase(str: string) {
    return str
        .replace(/-|_/gm, ' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        .replace(' ', '');
}

export function parseCamelCase(str: string) {
    const pascalCase = parsePascalCase(str);
    return pascalCase.charAt(0).toLocaleLowerCase() + pascalCase.slice(1);
}

export function parseKebabCase(str: string) {
    return str.replace(/-|_/gm, ' ').replace(' ', '-').toLocaleLowerCase();
}

export function parseSnakeCase(str: string, connector: string = '_') {
    return str.replace(/-|_/gm, ' ').replace(' ', connector).toLocaleLowerCase();
}

export function parseUpperSnakeCase(str: string) {
    return parseSnakeCase(str).toLocaleUpperCase();
}
