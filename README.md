# Express' App Generator

## 📦 Installation

```cmd
npm install -g expressjs-mongodb-generator
```

## 🚀 Quick Start

This app generates an Express project with bcrypt, cookie-parser, cors, dotenv, express, jsonwebtoken, and mongoose built in for RESTful APIs

### ▶️ To start, run

```
create-express-app
```

and you'll see the questions.

### 💻 Command Line Questions

Once you run create-express-app in the command line, you'll see four questions, including:

```cmd
what is your project name?,

what is your database address? ,

what is your secret key for JWT?

what is the project port? ,
```

All of these four questions are required for the project to be generated.

Once the project is generated, run

```cmd
npm start
```

And the project will start with the route you entered earlier.

## 📁 Project Folder Structures

```cmd
├── app/
│   ├── controllers/
│   │   ├── index.js
│   ├── middlewares/
│   │   ├── index.js
│   ├── models/
│   │   ├── index.js
│   ├── routes/
│   │   ├── index.js
│   ├── schema/
│   │   ├── index.js
│   └── index.js
├── .gitignore
├── .env
├── package.json
├── server.js
└── README.md
```

I welcome and look forward to your pull requests!
