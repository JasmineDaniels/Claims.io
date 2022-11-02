const { Employee } = require('../models');

const getAllEmployees = async (req, res) => {
    try {
        const allEmployees = Employee.find({});
        res.json(allEmployees)
    } catch (error) {
        res.status(500).json(error)
    }
    
};

const createNewEmployee = async (req, res) => {
    console.log(req.body);
    try {
        const employee = await Employee.create(req.body);
        if (!employee) {
            return res.status(400).json({ message: 'Duplicate entry' });
        }
        res.json(employee); // add token
    } catch (error) {
        res.status(500).json({ message: `${error}`})
    }
};

const updateEmployee = async (req, res) => {
    console.log(req.body);
    try {
        const update = req.body;
        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: req.body._id },
            { $set: update },
            { runValidators: true, returnOriginal: false }
        );
        
        if(!updatedEmployee){
            return res.status(404).json({ message: "This employee doesn't exist."})
        } 
        res.json(updatedEmployee)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}`})
    };
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
}