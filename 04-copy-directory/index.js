const path = require('path');
const fs = require('fs/promises');

const makeDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const clearCopyDir = async (dirPath) => {
  const filesArr = await fs.readdir(dirPath);
  for (const file of filesArr) {
    const filePath = path.join(dirPath, file);
    await fs.unlink(filePath);
  }
};

const copyDir = async () => {
  const filesPath = path.join(__dirname, 'files');
  const filesCopyPath = path.join(__dirname, 'files-copy');
  await makeDir(filesCopyPath);
  await clearCopyDir(filesCopyPath);
  const filesArr = await fs.readdir(filesPath);
  for (const file of filesArr) {
    const srcFile = path.join(filesPath, file);
    const destFile = path.join(filesCopyPath, file);
    await fs.copyFile(srcFile, destFile);
  }
};
copyDir();
