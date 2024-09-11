const fs = require('fs').promises;

const regex = /[^/]+$/;
async function createDirectories(dirPath, index) {
  if (index === 0) {
    await fs.mkdir(dirPath);
    console.log(`created ${dirPath.match(regex)} directory`);
  } else {
    await fs.mkdir(dirPath);
    console.log(`created ${dirPath.match(regex)} directory`);
    await fs.writeFile(`${dirPath}/index.js`, '');
    console.log(`created ${dirPath.match(regex)} /index.js file`);
  }
}
module.exports = createDirectories;
