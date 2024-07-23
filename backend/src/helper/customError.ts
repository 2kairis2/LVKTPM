import { HttpStatus } from '~/types';

export class CustomError extends Error {
    status: HttpStatus | number;
    constructor(message: string, statusCode: HttpStatus | number) {
        super(message);
        this.status = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
