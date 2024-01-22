const fs = require('fs');
const fsPromises = require('fs/promises')
const path = require ('path');

//todo ПУТИ

const srcTemplate = path.join(__dirname, 'template.html')
const srcHtmlComp = path.join(__dirname, 'components');
const srcCSS = path.join(__dirname, 'styles');
const srcAssets = path.join(__dirname, 'assets');
const destPass = path.join(__dirname, 'project-dist');

async function createdDirDest() {
         await fsPromises.mkdir(destPass, {recursive: true});
         await fsPromises.copyFile(srcTemplate, path.join(destPass, 'index.html'));
     }
    createdDirDest()


 async function readTemplate() {
    const templateFile = await fsPromises.readFile(srcTemplate, {encoding: 'utf8'}); // Приходит текст HTML шаблона
    const compNamesExt = await fsPromises.readdir(srcHtmlComp); //  массив с полным именем файлов компонентов
    const compNames = compNamesExt.map((file) => file.split('.')[0]) //  массив с именами файлов компонентов
    let buidHtml = await fsPromises.readFile(path.join(destPass, 'index.html'), {encoding: 'utf8'}); // ПУТЬ К ИТОГОВОМУ ФАЙЛУ
    let copyTemplate = await fsPromises.readFile(srcTemplate, {encoding: 'utf8'});
    for (const file of compNames) {
            const textComponents = await fsPromises.readFile(path.join(srcHtmlComp, `${file}.html`), {encoding: 'utf8'});
            copyTemplate = copyTemplate.replace(`{{${file}}}`, `${textComponents}`);
            await fsPromises.writeFile(path.join(destPass, 'index.html'), copyTemplate);
    }
}
readTemplate()
