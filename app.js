const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const Todo = require('./models/todo')
const prompt = require('prompt-sync')();

const menu = console.log('Welcome to the CRM')

console.log('What would you like to do?')

console.log('1. Create a customer')
console.log('2. View all customers')
console.log('3. Update a customer')
console.log('4. Delete a customer')
console.log('5. quit')

// console.log('5. quit')

const promenu = prompt('Number of action to run:');


// Welcome to the CRM

// What would you like to do?

// 1. Create a customer
//   2. View all customers
//   3. Update a customer
//   4. Delete a customer
//   5. quit

// Number of action to run: 
// # user inputs 3

console.log(`Your choies is ${promenu}`);