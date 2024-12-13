const prompt = require('prompt-sync')()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Customer = require('./model/customer')

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected' , () => {
  console.log(`Connected to mongoDB Database: ${mongoose.connection.name}`)
})

const showMenu = () => {
  console.log("Welcome to the CRM")
  console.log("\nWhat would you like to do?")
  console.log("1. Create a customer")
  console.log("2. View all customers")
  console.log("3. Update a customer")
  console.log("4. Delete a customer")
  console.log("5. Quit")
}

const createCustomer = async () => {
  console.log("\nCreating a new customer...")
  const name = prompt("What is the customer's name? ")
  const age = parseInt(prompt("What is the customer's age? "), 10)

  const customer = new Customer({ name, age })
  await customer.save()
  console.log("Customer created successfully!")
}

const viewCustomers = async () => {
  console.log("\nViewing all customers...")
  const customers = await Customer.find()
  if (customers.length === 0) {
    console.log("No customers found.")
    return
  }
  customers.forEach((customer) => {
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
  })
}

const updateCustomer = async () => {
  console.log("\nUpdating a customer...")
  const customers = await Customer.find()
  if (customers.length === 0) {
    console.log("No customers to update.")
    return
  }

  console.log("Below is a list of customers:")
  customers.forEach((customer) => {
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
  })

  const id = prompt("Copy and paste the id of the customer you would like to update here: ")
  const customer = await Customer.findById(id)

  if (!customer) {
    console.log("Customer not found!")
    return
  }

  const newName = prompt(`What is the customer's new name (current: ${customer.name})? `)
  const newAge = parseInt(prompt(`What is the customer's new age (current: ${customer.age})? `), 10)

  customer.name = newName || customer.name
  customer.age = newAge || customer.age

  await customer.save()
  console.log("Customer updated successfully!")
}

const deleteCustomer = async () => {
  console.log("\nDeleting a customer...")
  const customers = await Customer.find()
  if (customers.length === 0) {
    console.log("No customers to delete.")
    return
  }

  console.log("Below is a list of customers:")
  customers.forEach((customer) => {
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
  })

  const id = prompt("Copy and paste the id of the customer you would like to delete here: ")
  const customer = await Customer.findById(id)

  if (!customer) {
    console.log("Customer not found!")
    return
  }

  await customer.remove()
  console.log("Customer deleted successfully!")
}

const main = async () => {
  let isRunning = true

  while (isRunning) {
    showMenu()
    const choice = prompt("Number of action to run: ")

    switch (choice) {
      case '1':
        await createCustomer()
        break
      case '2':
        await viewCustomers()
        break
      case '3':
        await updateCustomer()
        break
      case '4':
        await deleteCustomer()
        break
      case '5':
        console.log("Exiting the Application")
        await mongoose.connection.close()
        isRunning = false
        break
      default:
        console.log("Invalid choice, please try again.")
    }
  }
}

main()
