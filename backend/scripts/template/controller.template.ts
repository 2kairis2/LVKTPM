import { parsePascalCase, parseCamelCase, parseKebabCase } from '~/helper';

export function controllerTemplate(moduleName: string) {
    const nameParsedPascal = parsePascalCase(moduleName);
    const nameParsedCamel = parseCamelCase(moduleName);
    const nameParsedKebab = parseKebabCase(moduleName);

    return `import { Request, Response } from 'express';

        import { handleError, responseWithData, getQueriesPaginate, responseWithPagination } from '~/helper';
        import ${nameParsedCamel}Service from './${nameParsedKebab}.service';
        
        const ${nameParsedCamel}Controller = {
            create${nameParsedPascal}: async (req: Request, res: Response) => {
                try {
                    const data = req.body;
                    const result = await ${nameParsedCamel}Service.create${nameParsedPascal}(data);
                    return responseWithData({ res, data: result });
                } catch (error) {
                    handleError(error, res);
                }
            },

            get${nameParsedPascal}: async (req: Request, res: Response) => {
                try {
                    const { page, limit, query, sort, skip, includes } = getQueriesPaginate(req.query)

                    const result = await ${nameParsedCamel}Service.get${nameParsedPascal}({
                        limit,
                        query,
                        sort,
                        skip,
                        includes,
                    });
                    const total = await ${nameParsedCamel}Service.countDocuments(query);

                    return responseWithPagination({ res, data: result, total, page, limit });
                } catch (error) {
                    handleError(error, res);
                }
            },

            get${nameParsedPascal}ById: async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;
                    const { includes } = req.query;

                    const result = await ${nameParsedCamel}Service.get${nameParsedPascal}ById(id, includes as string | Array<string>);
                    return responseWithData({ res, data: result });
                } catch (error) {
                    handleError(error, res);
                }
            },

            update${nameParsedPascal}: async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;
                    const data = req.body;

                    const result = await ${nameParsedCamel}Service.update${nameParsedPascal}(id, data);
                    return responseWithData({ res, data: result });
                } catch (error) {
                    handleError(error, res);
                }
            },

            delete${nameParsedPascal}: async (req: Request, res: Response) => {
                try {
                    const { id } = req.params;

                    const result = await ${nameParsedCamel}Service.delete${nameParsedPascal}(id);
                    return responseWithData({ res, data: result });
                }
                catch (error) {
                    handleError(error, res);
                }
            },
        }
            
        export default ${nameParsedCamel}Controller;`;
}
