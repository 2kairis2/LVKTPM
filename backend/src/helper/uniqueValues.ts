/* eslint-disable no-unused-vars */
import { Model, Document, FilterQuery } from 'mongoose';

/**
 * Kiểm tra các giá trị trong object có phải là duy nhất không.
 * @param model
 * @param uniqueFields
 * @returns An object with the fields and their uniqueness.
 * @example
 * const uniqueValues = await areUniqueValues(User, { email: 'abc@gmail.com' });
 * if (uniqueValues.email) {
 *    console.log('Email đã tồn tại');
 * }
 */
export async function areUniqueValues<T>(
    model: Model<Document & any>,
    uniqueFields: { [key in keyof T]?: any },
): Promise<{ [key in keyof T]?: boolean }> {
    const orConditions: FilterQuery<T>[] = Object.keys(uniqueFields).map((key) => {
        return { [key]: uniqueFields[key as keyof T] };
    }) as FilterQuery<T>[];

    if (orConditions.length === 0) {
        return {};
    }

    const existingDocuments = await model.find({ $or: orConditions });
    console.log('🚀 ~ existingDocuments:', existingDocuments);

    const uniqueResults: { [key in keyof T]?: boolean } = {};

    Object.keys(uniqueFields).forEach((key) => {
        const isUnique = existingDocuments.some((doc) => doc[key] === uniqueFields[key as keyof T]);
        uniqueResults[key as keyof T] = isUnique;
    });

    return uniqueResults;
}
