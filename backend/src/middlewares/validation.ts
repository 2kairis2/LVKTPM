import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function validateDto(type: any): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const input = plainToInstance(type, req.body);
        validate(input, { whitelist: true, forbidNonWhitelisted: true }).then((errors) => {
            if (errors.length > 0) {
                const message = errors
                    .map((error) => {
                        if (error.constraints) {
                            return Object.values(error.constraints);
                        }
                        if (error.children) {
                            return error.children
                                .map((child) => {
                                    if (child.constraints) {
                                        return Object.values(child.constraints);
                                    }
                                    if (child.children) {
                                        return child.children
                                            .map((subChild) => {
                                                if (subChild.constraints) {
                                                    return Object.values(subChild.constraints);
                                                }
                                            })
                                            .join(', ');
                                    }
                                })
                                .join(', ');
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
