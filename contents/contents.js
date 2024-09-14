const setupSeverContent = `const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

const setupServer = () => {
  app.listen(process.env.port, () => {
    console.log('Server is running on http://localhost:3001');
  });
};

const setConfig = () => {
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
  );
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  mongoose
    .connect(process.env.db)
    .then(console.log('connected to data base'))
    .catch((err) => console.log(err));
  mongoose.Promise = global.Promise;
};

const setRouter = () => {
  app.use(require('./routes'));
};

module.exports = class {
  constructor() {
    try {
      setupServer();
      setConfig();
      setRouter();
    } catch (err) {
      console.log(err);
    }
  }
};
`;
const serverJsContent = `const App = require('./app');
new App();
`;

const gitignore = `# Node modules
node_modules/

# Logs
logs
*.log
npm-debug.log*

# Environment variables
.env

# Build output
dist/
build/

# Temporary files
tmp/
temp/

# IDE and editor specific files
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# OS generated files
.DS_Store
Thumbs.db

# Coverage directory used by tools like istanbul
coverage/

# Miscellaneous
*.tgz
`;

function getRelativeContents(content) {
  const [projectName, database, secret, port] = content;
  const packageJsonContent = `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "the backend of the ${projectName} project",
  "main": "server.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "author": "Emran Ghnabari <emranghni.work@gmail.com>",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.6.1"
  }
}
`;
  const dotenvContent = `SECRET_KEY="${secret}"
db="${database}"
port=${port}
`;
  return { packageJsonContent, dotenvContent };
}

module.exports = {
  setupSeverContent,
  serverJsContent,
  gitignore,
  getRelativeContents,
};
