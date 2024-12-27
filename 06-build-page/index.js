const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const srcTemplate = path.join(__dirname, 'template.html');
const srcHtmlComp = path.join(__dirname, 'components');
const srcCSS = path.join(__dirname, 'styles');
const srcAssets = path.join(__dirname, 'assets');
const destPass = path.join(__dirname, 'project-dist');
const destAssets = path.join(destPass, 'assets');

async function createdDirDest() {
  await fsPromises.mkdir(destPass, { recursive: true });
  await fsPromises.copyFile(srcTemplate, path.join(destPass, 'index.html'));
}
createdDirDest();

async function readTemplate() {
  const compNamesExt = await fsPromises.readdir(srcHtmlComp); //  массив с полным именем файлов компонентов
  const compNames = compNamesExt.map((file) => file.split('.')[0]); //  массив с именами файлов компонентов
  let copyTemplate = await fsPromises.readFile(srcTemplate, {
    encoding: 'utf8',
  });
  for (let i = 0; i < compNames.length; i += 1) {
    const textComponents = await fsPromises.readFile(
      path.join(srcHtmlComp, `${compNames[i]}.html`),
      { encoding: 'utf8' },
    );
    copyTemplate = copyTemplate.replace(
      `{{${compNames[i]}}}`,
      `${textComponents}`,
    );
    if (i === compNames.length - 1) {
      await fsPromises.writeFile(
        path.join(destPass, 'index.html'),
        copyTemplate,
      );
    }
  }
}
readTemplate();

const wStream = fs.createWriteStream(path.join(destPass, 'style.css'));
fs.readdir(srcCSS, { withFileTypes: true }, (err, files) => {
  if (err) return console.log(err);
  const correctFiles = files.filter((file) => {
    return file.name.includes('.css') && file.isFile();
  });
  correctFiles.forEach((file) => {
    const rStream = fs.createReadStream(path.join(srcCSS, `${file.name}`));
    rStream.on('data', (data) => wStream.write(data.toString()));
  });
});

fs.mkdir(destAssets, { recursive: true }, (err) => {
  if (err) return console.log(err);
});

function copy(directory, destAssets) {
  fs.readdir(directory, (err, files) => {
    if (err) return console.log(err);
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return console.log(err);
        if (stats.isDirectory()) {
          fs.mkdir(path.join(destAssets, file), { recursive: true }, (err) => {
            if (err) console.log(err);
            copy(filePath, path.join(destAssets, file));
          });
        } else {
          fs.copyFile(filePath, path.join(destAssets, file), (err) => {
            if (err) console.log(err);
          });
        }
      });
    });
  });
}
copy(srcAssets, destAssets);
