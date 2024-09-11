#!/usr/bin/env node
const readline = require('readline');
const { stdin: input, stdout: output } = require('node:process');
const setup = require('./functions/setup');
const {
  isValidMongoDBAddress,
  isValidPort,
  isValidProjectName,
  isValidSecretKey,
} = require('./validation/validation');

const rl = readline.createInterface({ input, output });

let answer = [];
const questions = [
  'what is your project name? ',
  'what is your database address? ',
  'what is your secret kye for JWT? ',
  'what is the project port? ',
];

function askQuestion(index) {
  if (index < questions.length) {
    rl.question(questions[index], (ans) => {
      let isValid = false;
      switch (index) {
        case 0:
          isValid = isValidProjectName(ans);
          break;
        case 1:
          isValid = isValidMongoDBAddress(ans);
          break;
        case 2:
          isValid = isValidSecretKey(ans);
          break;
        case 3:
          isValid = isValidPort(ans);
          break;
      }

      if (isValid) {
        answer.push(ans);
        askQuestion(index + 1);
      } else {
        if (index === 0) {
          console.log(
            'Project name should be a string and should not be empty'
          );
        } else if (index === 1) {
          console.log(
            'Database address must be a valid MongoDB address and be a string and should not be empty'
          );
        } else if (index === 2) {
          console.log(
            'Secret key must be a string, contain symbols, be at least 10 chars long and should not be empty'
          );
        } else if (index === 3) {
          console.log(
            'Port must be a number between 1 to 65535 and should not be empty'
          );
        }
        askQuestion(index);
      }
    });
  } else {
    setup(answer);
    rl.close();
  }
}

askQuestion(0);
