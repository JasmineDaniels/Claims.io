const { Employee, User } = require('../models');
const { signToken, refreshToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');
const path = require('path');
const { findClients } = require('../utils/helpers');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const getAllEmployees = async (req, res) => {
    try {
        const allEmployees = await Employee.find({});
        res.json(allEmployees)
    } catch (error) {
        res.status(500).json(error)
    }
};

const getOneEmployee = async (req, res) => { //change for emp Sign In
    console.log(req.body);
    try {
        const employee = await Employee.findOne({
            $or: [{ email: req.body.email }, { _id: req.body._id }, { email: req.body.email }]
        });
        res.json(employee);
    } catch (error) {
        res.status(404).json({ message: `No Agent with is id` })
    }
};

const createNewEmployee = async (req, res) => { // admin + auth 
    console.log(req.body);
    // const newEmployee = {
    //     role: 
    // }
    try {
        const employee = await Employee.create(req.body);
        if (!employee) {
            return res.status(400).json({ message: 'Duplicate entry' });
        }
        // const accessToken = signToken(employee);
        res.json(employee); // add token
    } catch (error) {
        res.status(500).json({ message: `${error}` })
    }
};

const employeeLogin = async (req, res) => {
    console.log(req.body)
    try {
        const employee = await Employee.findOne({
            $or: [{ policyNo: req.body.policyNo }, { _id: req.body._id }, { email: req.body.email }]
        });
        if (!employee) {
            return res.status(400).json({ message: "Can't find this employee" });
        }
        const checkPassword = await employee.checkPW(req.body.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const accessToken = signToken(employee);
        const longToken = refreshToken(employee) 
        //const refreshemployee = await employee.update({ refreshToken: longToken })
        const refreshemployee = await Employee.updateOne({ employee }, { refreshToken: longToken });
        res.cookie('jwt', longToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken, employee })

    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    }
};

const refreshEmployeeToken = async (req, res) => {
    try {
        //const cookies = req.cookies;
        let cookies = req.headers.cookie;
        //console.log(cookies, `req.cookies`);
        //if cookies & if cookies has jwt property
        if (!cookies) {
            return res.status(401);
        }
        //console.log(cookies.jwt, `cookies.jwt`);
        const refreshToken = cookies;
        const foundEmployee = await Employee.findOne({ refreshToken: refreshToken });
        if (!foundEmployee) {
            return res.status(403);
        }

        const verifyRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!verifyRefresh) {
            return res.status(403);
        }
        const accessToken = signToken(foundEmployee);
        res.json({ accessToken, foundEmployee })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error` })
    }
};

const employeeLogout = async (req, res) => {
    try {
        //on client delete access token from memory 
        let cookies = req.headers.cookie;
        if (!cookies) {
            return res.status(204); //Successful No Content
        }
        const refreshToken = cookies;
        const foundEmployee = await Employee.find({ refreshToken: refreshToken });
        if (!foundEmployee) {
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.status(404).json({ message: `Could not find user` });
            // return res.sendStatus(204);
        }

        const deleteRFToken = await Employee.updateOne({ foundEmployee }, { refreshToken: '' })
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({ message: `Employee successfully logged out` });
        // res.sendStatus(204);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error` })
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
        if (!updatedEmployee) {
            return res.status(404).json({ message: "This employee doesn't exist." })
        }
        res.json(updatedEmployee)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    };
};

const deleteEmployee = async (req, res) => { // admin + auth
    try {
        // assign claims and clients assoc. with this emp a new agent
        const employee = await Employee.deleteOne({ $or: [{ _id: req.body._id }, { email: req.body.email }] });
        if (!employee) {
            return res.status(400).json({ message: "Can't find this employee" });
        }; 
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    }
};

const addClient = async (req, res) => { // make multiple $in: - array of clients
    try {
        const employeeData = req.body.user;
        const clientData = req.body.clients;
        const foundEmployee = await Employee.findByIdAndUpdate(
            { _id: employeeData._id },
            { $addToSet: { clients: clientData._id } },
            { runValidators: true, returnOriginal: false }
        );
        if (!foundEmployee) {
            return res.status(404).json({ message: "This employee doesn't exist." })
        }
        const updateClient = await User.updateOne({_id: clientData._id}, { assignedAgent: employeeData._id})
        res.json(foundEmployee)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    }
};

const getClients = async (req, res) => {
    const employeeData = req.body.user;
    const clientData = req.body.clients;
    try {
        const clients = await findClients(employeeData)
        if (!clients){
            return res.status(404).json({ message: `This employee has no clients`});
        }
        res.json(clients)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` });
    }
};

const removeClient = async (req, res) => {
    try {
        const employeeData = req.body.user;
        const clientData = req.body.clients;
        const foundEmployee = await Employee.findByIdAndUpdate(
            { _id: employeeData._id },
            { $pull: { clients: clientData._id } },
            { runValidators: true, returnOriginal: false }
        );
        if (!foundEmployee) {
            return res.status(404).json({ message: "This employee doesn't exist." })
        }
        res.json(foundEmployee)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    }
};


module.exports = {
    getAllEmployees,
    getOneEmployee,
    createNewEmployee,
    refreshEmployeeToken, // make middleware?
    employeeLogin,
    employeeLogout,
    updateEmployee,
    deleteEmployee,
    addClient,
    getClients,
    removeClient
}