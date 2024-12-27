const path = require('path');
const fs = require('fs');
const correctPath = path.join(__dirname, 'secret-folder');

fs.readdir(correctPath, { withFileTypes: true }, (err, elements) => {
  const files = elements.filter((element) => element.isFile());
  files.forEach((file) => {
    const fileName = file.name.split('.').slice(0, -1).join('.');
    const ext = path.extname(file.name).replace('.', '');
    fs.stat(path.join(correctPath, `${file.name}`), (err, stats) => {
      const size = (stats.size / 1024).toFixed(3);
      console.log(`${fileName} - ${ext} - ${size}kb`);
    });
  });
});
