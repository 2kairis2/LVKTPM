import fs from 'fs';
import path from 'path';

import {
    controllerTemplate,
    createModuleTemplateDto,
    modelTemplate,
    routesTemplate,
    serviceTemplate,
    updateModuleTemplate,
} from './template';

const moduleName = process.argv[2];

if (!moduleName || moduleName === '') {
    console.error('Module name is required');
    process.exit(1);
}

if (fs.existsSync(path.join(__dirname, `../src/modules/${moduleName}`))) {
    console.error('Module already exists');
    process.exit(1);
}

const modulePath = path.join(__dirname, `../src/modules/${moduleName}`);
const dtoPath = path.join(modulePath, 'dtos');

fs.mkdirSync(modulePath);
fs.mkdirSync(dtoPath);

const moduleContent: { [key: string]: string } = {
    service: serviceTemplate(moduleName),
    model: modelTemplate(moduleName),
    controller: controllerTemplate(moduleName),
    routes: routesTemplate(moduleName),
};

const dtoContent: { [key: string]: { filename: string; content: string } } = {
    create: {
        filename: `create-${moduleName}.dto`,
        content: createModuleTemplateDto(moduleName),
    },
    update: {
        filename: `update-${moduleName}.dto`,
        content: updateModuleTemplate(moduleName),
    },
    index: {
        filename: 'index',
        content: `export * from './create-${moduleName}.dto';\nexport * from './update-${moduleName}.dto';`,
    },
};

Object.keys(moduleContent).forEach((key) => {
    fs.writeFileSync(path.join(modulePath, `${moduleName}.${key}.ts`), moduleContent[key]);
    console.log(`Created ${moduleName}.${key}.ts`);
});

Object.keys(dtoContent).forEach((key) => {
    fs.writeFileSync(path.join(dtoPath, `${dtoContent[key].filename}.ts`), dtoContent[key].content);
    console.log(`Created ${dtoContent[key].filename}.ts`);
});
