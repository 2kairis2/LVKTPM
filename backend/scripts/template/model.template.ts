import { parsePascalCase, parseCamelCase } from '~/helper';

export function modelTemplate(moduleName: string) {
    const nameParsedPascal = parsePascalCase(moduleName);
    const nameParsedCamel = parseCamelCase(moduleName);

    return `import mongoose from 'mongoose';

        const ${nameParsedCamel}Schema = new mongoose.Schema({});
        
        export default mongoose.model('${nameParsedPascal}', ${nameParsedCamel}Schema);`;
}
