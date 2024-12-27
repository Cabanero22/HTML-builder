const path = require('path');
const fsPromises = require('fs/promises');
const { stdin, stdout, exit } = process;

const createFile = async (fileName) => {
  await fsPromises.writeFile(fileName, '');
};

const writeFile = async (fileName, data) => {
  await fsPromises.appendFile(fileName, data);
};

const start = async () => {
  try {
    const byeMassage = '\nGood bye, human!';
    const fileName = path.join(__dirname, 'very-secret-file.txt');
    await createFile(fileName);
    stdout.write('Hello, human! You can write your text below:\n');
    process.on('SIGINT', () => {
      stdout.write(byeMassage);
      exit();
    });
    stdin.on('data', async (data) => {
      if (data.toString().toLowerCase().trim() === 'exit') {
        stdout.write(byeMassage);
        exit();
      } else {
        await writeFile(fileName, data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
start();
