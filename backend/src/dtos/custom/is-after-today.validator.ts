import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAfterToday(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isAfterToday',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if (value instanceof Date) {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0); // Set to the start of today
                        return value > today;
                    }
                    return false;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a date before today`;
                },
            },
        });
    };
}
