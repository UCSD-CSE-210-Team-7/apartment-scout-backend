const fs = require("fs");

// Import all the files in the current directory
const imports = fs
  .readdirSync(`${__dirname}/`)
  .filter((i) => fs.statSync(`${__dirname}/${i}`).isDirectory())
  .map((i) => ({
    [i]: require(`./${i}`),
  }));

module.exports = Object.assign({}, ...imports);
