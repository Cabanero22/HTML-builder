const fs = require('fs');
const path = require('path');

const destPass = path.join(__dirname, 'project-dist');
const sourcePass = path.join(__dirname, 'styles')
const wStream = fs.createWriteStream(path.join(destPass, 'bundle.css'))

fs.readdir(sourcePass, { withFileTypes: true }, (err, files) => {
    if (err) return console.log(err);

    const correctFiles = files.filter((file) => {
        return file.name.includes('.css') && file.isFile(); 
    })

    correctFiles.forEach((file) => {
        const rStream = fs.createReadStream(path.join(sourcePass, `${file.name}`))
        rStream.on('data', (data) => wStream.write(data.toString()))
    })
    console.log('Сборка завершена!')
})

