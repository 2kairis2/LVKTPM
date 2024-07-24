import { parsePascalCase, parseCamelCase, parseKebabCase } from '~/helper';

export function serviceTemplate(moduleName: string) {
    const nameParsedCamel = parseCamelCase(moduleName);
    const nameParsedPascal = parsePascalCase(moduleName);
    const nameParsedKebab = parseKebabCase(moduleName);

    return `import ${nameParsedPascal} from './${nameParsedKebab}.model';
        import { CustomError } from '~/helper';
        import { HttpStatus, StringOrObjectId } from '~/types';

        const ${nameParsedCamel}Service = {    
            create${nameParsedPascal}: async (data: any) => {
                const ${nameParsedCamel} = new ${nameParsedPascal}(data);
                return ${nameParsedCamel}.save();
            },
            countDocuments: async (query: Record<string, any>) => {
                const count = await ${nameParsedPascal}.countDocuments(query);
                return count;
            },
            get${nameParsedPascal}: async ({
                    limit = 10,
                    sort = '-createdAt',
                    skip = 0,
                    query = {},
                    includes = '',
                }: {
                    limit?: number;
                    sort?: string | Record<string, any>;
                    skip?: number;
                    query?: Record<string, any>;
                    includes?: string | Array<string>;
                }) => {
                const ${nameParsedCamel}s = await ${parsePascalCase(
        moduleName,
    )}.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

                return ${nameParsedCamel}s;
            },

            get${nameParsedPascal}ById: async (id: StringOrObjectId, includes: string | Array<string> = '') => {
                const ${nameParsedCamel} = await ${parsePascalCase(moduleName)}.findById(id).populate(includes);

                if (!${nameParsedCamel}) {
                    throw new CustomError('${nameParsedPascal} không tìm thấy', HttpStatus.NOT_FOUND);
                }

                return ${nameParsedCamel};
            },

            update${nameParsedPascal}: async (id: StringOrObjectId, data: any) => {
                const ${nameParsedCamel} = await ${nameParsedPascal}.findByIdAndUpdate(id, data, {
                    new: true,
                });

                if (!${nameParsedCamel}) {
                    throw new CustomError('${nameParsedPascal} không tồn tại', HttpStatus.NOT_FOUND);
                }

                return ${nameParsedCamel};
            },
            
            delete${nameParsedPascal}: async (id: StringOrObjectId) => {
                const ${nameParsedCamel} = await ${nameParsedPascal}.findByIdAndDelete(id);

                if (!${nameParsedCamel}) {
                    throw new CustomError('${nameParsedPascal} không tìm thấy', HttpStatus.NOT_FOUND);
                }

                return ${nameParsedCamel};
            },
        }
            
        export default ${nameParsedCamel}Service;`;
}
