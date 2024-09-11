const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

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
    path.join(projectDir, 'app', 'controllers'),
    path.join(projectDir, 'app', 'middlewares'),
    path.join(projectDir, 'app', 'models'),
    path.join(projectDir, 'app', 'routes'),
    path.join(projectDir, 'app', 'schemas'),
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

      console.log('checking the pakage.json for any dependencie update');
      execSync('npx npm-check-updates -u', {
        cwd: projectDir,
        stdio: 'inherit',
      });

      console.log(`Installing dependencies for ${[projectName]} project...`);
      execSync('npm install', { cwd: projectDir, stdio: 'inherit' });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = setup;
