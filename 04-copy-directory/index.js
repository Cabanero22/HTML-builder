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
  const filesPass = path.join(__dirname, 'files');
  const filesCopyPass = path.join(__dirname, 'files-copy');
  await makeDir(filesCopyPass);
  await clearCopyDir(filesCopyPass);
  const filesArr = await fs.readdir(filesPass);
  for (const file of filesArr) {
    const srcFile = path.join(filesPass, file);
    const destFile = path.join(filesCopyPass, file);
    await fs.copyFile(srcFile, destFile);
  }
};
copyDir();
