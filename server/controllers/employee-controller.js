const { Employee, User } = require('../models');
const { signToken, signRefreshToken } = require('../utils/auth');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const path = require('path');
const { findClients, findClaims } = require('../utils/helpers');
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
            $or: [{ email: req.body.email }, { _id: req.params._id }, { email: req.body.email }]
        });
        res.json(employee);
    } catch (error) {
        res.status(404).json({ message: `No Agent with is id` })
    }
};

const createNewEmployee = async (req, res) => { // admin + auth 
    //console.log(req.body);
    try {
        const duplicate = await Employee.findOne({ email: req.body.email}).exec();
        if (duplicate) return res.sendStatus(409);
        const employee = await Employee.create(req.body);
        if (!employee) {
            return res.status(400).json({ message: 'Please enter a valid Email' });
        }
        // const accessToken = signToken(employee);
        res.json(employee); // add token
    } catch (error) {
        res.status(500).json({ message: `${error}` })
    }
};

const employeeLogin = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            $or: [{ _id: req.body._id }, { email: req.body.email }]
        }).exec();
        if (!employee) {
            return res.status(400).json({ message: "Can't find this employee" });
        }
        //const checkPassword = await employee.checkPW(req.body.password);
        const checkPassword = await bcrypt.compare(req.body.password, employee.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const accessToken = signToken(employee);
        const refreshToken = signRefreshToken(employee) 

        //save refresh token to DB
        employee.refreshToken = refreshToken;
        const result = await employee.save();

        res.cookie('jwt', refreshToken, { //Put secure: true in PRODUCTION!
            httpOnly: true,
            sameSite: 'None',
            //secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken, result }) 

    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    }
};

const refreshEmployeeToken = async (req, res) => {
    console.log(`This is employee req.cookies`, req.cookies)
    try {
        const cookies = req.cookies.jwt;
        //if cookies & if cookies has jwt property
        if (!cookies) {
            return res.sendStatus(401);
        }

        const refreshToken = cookies;
        const foundEmployee = await Employee.findOne({ refreshToken: refreshToken }).exec();
        if (!foundEmployee) {
            return res.status(404).json({message: `Could not find user`})
            //return res.sendStatus(404);
        }

        const verifyRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!verifyRefresh) {
            return res.sendStatus(403); //Forbidden
        }
        //get new access token
        const accessToken = signToken(foundEmployee);
        res.json({ accessToken, foundEmployee })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error` })
    }
};

const employeeLogout = async (req, res) => {
    console.log(`this is req.cookies`, req.cookies)
    try {
        //On client delete access token from memory 
        let cookies = req.cookies.jwt;
        if (!cookies) {
            return res.status(204); //Successful No Content
        }
        const refreshToken = cookies;
        //const foundEmployee = await Employee.find({ refreshToken: refreshToken });
        const foundEmployee = await Employee.findOne({ refreshToken: refreshToken }).exec();
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

        foundEmployee.refreshToken = '';
        const result = await foundEmployee.save();
        //console.log(result);
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
            { _id: req.params._id },
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
        const employeeData = req.params._id; 
        const clientData = req.params.client_id;
        const foundEmployee = await Employee.findByIdAndUpdate(
            { _id: employeeData },
            { $addToSet: { clients: clientData } },
            { runValidators: true, returnOriginal: false }
        );
        if (!foundEmployee) {
            return res.status(404).json({ message: "This employee doesn't exist." })
        }
        const updateClient = await User.updateOne({_id: clientData}, { assignedAgent: employeeData})
        res.json(foundEmployee)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    }
};

const getClients = async (req, res) => {
    const employeeData = req.params._id;
    //const clientData = req.body.clients;
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

const getClaims = async (req, res) => {
    const employeeData = req.params._id;
    //const clientData = req.body.clients;
    try {
        const claims = await findClaims(employeeData)
        if (!claims){
            return res.status(404).json({ message: `This employee has no claims`});
        }
        res.json(claims)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` });
    }
};

const updateClient = async (req, res) => {
    console.log(req.params);
    console.log(req.body); 
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.client_id },
            { $set: req.body },
            { runValidators: true, returnOriginal: false }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "This user doesn't exist." })
        }
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    };
};

const removeClient = async (req, res) => {
    try {
        const employeeData = req.params._id;
        const clientData = req.params.client_id;
        const foundEmployee = await Employee.findByIdAndUpdate(
            { _id: employeeData },
            { $pull: { clients: clientData } },
            { runValidators: true, returnOriginal: false }
        );
        
        //foundUser.update({assignedAgent: ObjectId("5dsfkjh2r74dsjdhf3r4f")}, {$unset: {category: 1 }});
        const updateClient = await User.updateOne({_id: clientData}, {$unset: {assignedAgent: 1 }})

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
    updateClient,
    removeClient,
    getClaims,
}