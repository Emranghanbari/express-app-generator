const fs = require('fs').promises;
const path = require('path');

const {
  serverJsContent,
  setupSeverContent,
  getRelativeContents,
} = require('../contents/contents');
const createDirectories = require('./createDirectories');

const regex = /[^/]+$/;

async function setup(answer) {
  const [projectName] = answer;
  const { dotenvContent, packageJsonContent } = getRelativeContents(answer);
  const projectDir = path.join(process.cwd(), projectName);
  const appDir = path.join(projectDir, 'app');
  const dir = [
    projectDir,
    appDir,
    path.join(appDir, 'controllers'),
    path.join(appDir, 'middlewares'),
    path.join(appDir, 'models'),
    path.join(appDir, 'routes'),
    path.join(appDir, 'schemas'),
  ];
  try {
    await fs.access(projectDir);
    console.log(`${projectDir.match(regex)} directory already exists`);
  } catch (error) {
    try {
      const promisedDirectoryCreation = dir.map((dirPath, index) => {
        createDirectories(dirPath, index);
      });
      await Promise.all(promisedDirectoryCreation);
      await fs.writeFile(`${projectDir}/server.js`, serverJsContent);
      console.log(`created server.js file at ${projectDir.match(regex)}`);
      await fs.writeFile(`${projectDir}/package.json`, packageJsonContent);
      console.log(`created package.json file at ${projectDir.match(regex)}`);
      await fs.writeFile(`${projectDir}/.env`, dotenvContent);
      console.log(`created .env file at ${projectDir.match(regex)}`);
      await fs.writeFile(`${appDir}/index.js`, setupSeverContent);
      console.log(`created index.js file at ${appDir.match(regex)}`);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = setup;
