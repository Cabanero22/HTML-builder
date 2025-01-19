const fs = require('fs/promises');
const path = require('path');

const mergeStyles = async () => {
  const sourcePath = path.join(__dirname, 'styles');
  const destPath = path.join(__dirname, 'project-dist');
  await fs.writeFile(path.join(destPath, 'bundle.css'), '');
  const folderContent = await fs.readdir(sourcePath);
  for (const item of folderContent) {
    if (path.extname(item) === '.css') {
      const content = await fs.readFile(path.join(sourcePath, item));
      await fs.appendFile(path.join(destPath, 'bundle.css'), content);
    }
  }
  console.log('Bundle complete!');
};
mergeStyles();
