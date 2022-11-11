const db = require('../config/connection');
const { User, Employee, Claim } = require('../models');

const users = require('./user-seeds');
const employees = require('./employee-seeds')


db.once('open', async () => {
    try {
        await User.insertMany(users)
        console.log('users seeded successfully');
        await Employee.insertMany(employees)
        console.log('employees seeded successfully');
    } catch (error) {
        console.error(error)
        process.exit(0); 
    }
})