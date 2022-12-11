const { User } = require('../models');
const { signToken, signRefreshToken } = require('../utils/auth');
const { findClientClaims, findClaimsByID } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.json(allUsers)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error` })
    }
};

const createNewUser = async (req, res) => {
    try {
        
        const user = await User.create(req.body);
        if (!user) {
            return res.status(400).json({ message: 'Duplicate entry' });
        }
        res.json(user); // add token
    } catch (error) {
        res.status(500).json({ message: `${error}` })
    }
};

const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [{ policyNo: req.body.policyNo }, { _id: req.body._id }, { email: req.body.email }]
        }).exec();
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }
        const checkPassword = await user.checkPW(req.body.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        //const roles = Object.values(user.role)
        const accessToken = signToken(user);
        const refreshToken = signRefreshToken(user) 
        //const refreshUser = await user.update({ refreshToken: refreshToken })
        //const refreshUser = await User.updateOne(user , { refreshToken: refreshToken });

        //save refresh token to DB
        user.refreshToken = refreshToken;
        const result = await user.save();

        res.cookie('jwt', refreshToken, {
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

const refreshUserToken = async (req, res) => {
    try {
        let cookies = req.cookies.jwt;
        //let cookies = req.headers.cookie;
        
        //if cookies & if cookies has jwt property
        if (!cookies) {
            return res.sendStatus(401);
        }
        //console.log(cookies.jwt, `cookies.jwt`);
        const refreshToken = cookies;
        const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
        if (!foundUser) {
            return res.sendStatus(403);
        }

        const verifyRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!verifyRefresh) {
            return res.sendStatus(403);
        }
        //const roles = Object.values(foundUser.role);
        const accessToken = signToken(foundUser);
        res.json({ accessToken, foundUser })
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error`, errorMessage: `${error}` })
    }

};

const userLogout = async (req, res) => {
    try {
        //on client delete access token from memory
        let cookies = req.cookies.jwt;
        //let cookies = req.headers.cookie;
        if (!cookies) {
            return res.sendStatus(204); //Successful No Content
        }
        const refreshToken = cookies;
        //const foundUser = await User.find({ refreshToken: refreshToken });
        const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
        if (!foundUser) {
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.status(404).json({ message: `Could not find user`});
            // return res.sendStatus(204);
        }

        //const deleteRFToken = await User.updateOne({ foundUser }, { refreshToken: '' })
        foundUser.refreshToken = '';
        const result = await foundUser.save();
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({message: `User successfully logged out`});
        // res.sendStatus(204);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error`, errorMessage: `${error}` })
    }

};

const getOneUser = async (req, res) => {

    try {
        const foundUser = await User.findOne({
            $or: [{ _id: req.params._id }, { policyNo: req.body.policyNo }, { _id: req.params.client_id }],
        }).populate('userClaims');

        if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }
        res.json(foundUser);
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    }
};

const updateUser = async (req, res) => {
    // console.log(req.params);
    // console.log(req.body);
    
    try {
        //const update = req.body;
        //const update = req.params;

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params._id },
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

// const deleteUser = async (req, res) => { 
//     const employeeData = req.body.user;
//     const clientData = req.body.clients;
//     try {
//         // Note: check if all claims status is closed 
//         const user = await User.deleteOne({ $or: [{ _id: req.body._id }, { email: req.body.email }] });
//         if (!user) {
//             return res.status(400).json({ message: "Can't find this user" });
//         }; 
//         // remove user from employee roster
//         const foundEmployee = await Employee.findByIdAndUpdate(
//             { _id: employeeData._id },
//             { $pull: { clients: clientData._id } },
//             { runValidators: true, returnOriginal: false }
//         );
//         res.sendStatus(204);
//     } catch (error) {
//         res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
//     }
// };

const getClaims = async (req, res) => {
    const userData = req.params._id;

    try {
        const claims = await findClientClaims(userData)
        if (!claims){
            return res.status(404).json({ message: `This user has no claims`});
        }
        res.json(claims)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` });
    }
};

module.exports = {
    getAllUsers,
    createNewUser,
    userLogin,
    refreshUserToken,
    userLogout,
    getOneUser,
    getClaims,
    updateUser,
}