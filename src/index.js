import os from 'os';
import { getUserName } from './utils/getUserName.js';
import { startApp } from './app/startApp.js';
import * as readline from 'readline/promises';
import { closeApp } from './app/closeApp.js';
import { commandsApp } from './app/commandsApp.js';


const currentDirectory = os.homedir();
const username = getUserName() || 'Guest';
startApp(username, currentDirectory);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
commandsApp(rl, username, currentDirectory);
closeApp(username, rl);
