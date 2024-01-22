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
    const compNamesExt = await fsPromises.readdir(srcHtmlComp); //  массив с полным именем файлов компонентов
    const compNames = compNamesExt.map((file) => file.split('.')[0]) //  массив с именами файлов компонентов
    let copyTemplate = await fsPromises.readFile(srcTemplate, {encoding: 'utf8'});
    for (let i = 0; i < compNames.length; i += 1) {
        const textComponents = await fsPromises.readFile(path.join(srcHtmlComp, `${compNames[i]}.html`), {encoding: 'utf8'});
        copyTemplate = copyTemplate.replace(`{{${compNames[i]}}}`, `${textComponents}`);
        if (i === compNames.length - 1) {
                await fsPromises.writeFile((path.join(destPass, 'index.html')), copyTemplate);
        }
    }
}
readTemplate()
