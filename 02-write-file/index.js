const path = require ("path");
const fs = require("fs");
const {stdin, stdout, exit} = process;

const wStream = fs.createWriteStream(path.join(__dirname, "02-write-file.txt"));
stdout.write("Приветствую, кожаный! Прошу ввести текст:\n");
const bye = "Прощай, кожаный!";

stdin.on("data", (data) => {
    if (data.toString().includes("exit")) {
        stdout.write(bye);
        exit();
    }
    wStream.write(data);
})
process.on("SIGINT", () => {
    stdout.write(bye);
    exit();
});