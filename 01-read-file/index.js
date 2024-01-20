const fs = require("fs");
const path = require ("path");
const correctPass = path.join(__dirname, "text.txt");
const stream = fs.createReadStream(correctPass);
stream.on("data", (chunk) => console.log(chunk.toString()));
