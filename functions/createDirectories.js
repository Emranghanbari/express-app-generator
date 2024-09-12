const fs = require('fs').promises;
const colors = require('colors');

const regex = /[^/]+$/;
async function createDirectories(dirPath, index) {
  if (index === 0) {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`created ${dirPath.match(regex)} directory`.green);
  } else {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`created ${dirPath.match(regex)} directory`.green);
    await fs.writeFile(`${dirPath}/index.js`, '');
    console.log(`created ${dirPath.match(regex)} /index.js file`.green);
  }
}
module.exports = createDirectories;
