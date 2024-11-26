const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const Todo = require('./models/todo')
const prompt = require('prompt-sync')();

const menu = prompt('Choese the action');

console.log(`Your choies is ${menu}`);