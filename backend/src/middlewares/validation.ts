import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function validationMiddleware(type: any): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const input = plainToInstance(type, req.body);
        validate(input).then((errors) => {
            if (errors.length > 0) {
                const message = errors
                    .map((error) => {
                        if (error.constraints) {
                            return Object.values(error.constraints);
                        }
                    })
                    .join(', ');
                res.status(400).json({ message });
            } else {
                req.body = input;
                next();
            }
        });
    };
}
