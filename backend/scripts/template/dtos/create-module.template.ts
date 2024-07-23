import { parsePascalCase } from '~/helper';

export function createModuleTemplateDto(moduleName: string) {
    return `export class Create${parsePascalCase(moduleName)}Dto {
        // Add your properties here
    }`;
}
