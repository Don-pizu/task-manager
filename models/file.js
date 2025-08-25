//models/file.js

const fs = require("fs");

exports.readFile = (file) => {
  if (!fs.existsSync(file)) 
    return [];
  return JSON.parse(fs.readFileSync(file));
};

exports.writeFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};
