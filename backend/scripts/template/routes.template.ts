import { parsePascalCase, parseUpperSnakeCase, parseKebabCase, parseCamelCase } from '~/helper';

export function routesTemplate(moduleName: string) {
    const nameParsedPascal = parsePascalCase(moduleName);
    const nameParsedUpperSnakeCase = parseUpperSnakeCase(moduleName);
    const nameParsedKebabCase = parseKebabCase(moduleName);
    const nameParsedCamel = parseCamelCase(moduleName);

    return `import { Router } from 'express';

        import { validatePermission, validateDto } from '~/middlewares';
        import { IPermission } from '~/types';
        import { Create${nameParsedPascal}Dto, Update${nameParsedPascal}Dto  } from './dtos';
        import ${nameParsedCamel}Controller from './${nameParsedKebabCase}.controller';

        const router = Router();

        router.post('/', validateDto(Create${nameParsedPascal}Dto), validatePermission(IPermission.CREATE_${nameParsedUpperSnakeCase}), ${nameParsedCamel}Controller.create${nameParsedPascal});
        router.get('/', validatePermission(IPermission.READ_${nameParsedUpperSnakeCase}), ${nameParsedCamel}Controller.get${nameParsedPascal});
        router.get('/info/:id',validatePermission(IPermission.READ_${nameParsedUpperSnakeCase}), ${nameParsedCamel}Controller.get${nameParsedPascal}ById);
        router.put('/:id', validateDto(Update${nameParsedPascal}Dto),validatePermission(IPermission.UPDATE_${nameParsedUpperSnakeCase}), ${nameParsedCamel}Controller.update${nameParsedPascal});
        router.delete('/:id', validatePermission(IPermission.DELETE_${nameParsedUpperSnakeCase}), ${nameParsedCamel}Controller.delete${nameParsedPascal});
        
        export default router;`;
}
