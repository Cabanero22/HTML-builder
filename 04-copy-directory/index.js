const path = require('path');
const fs = require('fs');

const filesPass = path.join(__dirname, 'files');
const filesCopyPass = path.join(__dirname, 'files-copy');

fs.mkdir(filesCopyPass, { recursive: true }, (err) => {
  if (err) return console.log(err);
});

fs.readdir(filesCopyPass, (err, files) => {
  if (err) return console.log(err);
  if (!files) return;
  if (files) {
    files.forEach((file) => {
      const copyFilePass = path.join(filesCopyPass, `${file}`);
      fs.unlink(copyFilePass, (err) => {
        if (err) return console.log(err);
      });
    });
  }
});

fs.readdir(filesPass, { withFileTypes: false }, (err, files) => {
  if (err) return console.log(err);
  files.forEach((file) => {
    fs.copyFile(
      path.join(filesPass, `${file}`),
      path.join(filesCopyPass, `${file}`),
      (err) => {
        if (err) return console.log(err);
        console.log(`File ${file} create`);
      },
    );
  });
});
