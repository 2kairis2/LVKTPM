import { parsePascalCase, parseSnakeCase } from '~/helper';

export function updateModuleTemplate(moduleName: string) {
    const nameParsedPascal = parsePascalCase(moduleName);
    const nameParsedSnakeCase = parseSnakeCase(moduleName, '-');

    return `import { IsNotEmpty } from 'class-validator';
        import { Create${nameParsedPascal}Dto } from './create-${nameParsedSnakeCase}.dto';

        export class Update${nameParsedPascal}Dto extends Create${nameParsedPascal}Dto {
            @IsNotEmpty()
            id: string;
        }`;
}
