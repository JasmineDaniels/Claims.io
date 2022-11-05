const { User } = require('../models');
const { signToken, refreshToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');

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
    console.log(req.body);
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
    console.log(req.body)
    try {
        const user = await User.findOne({
            $or: [{ policyNo: req.body.policyNo }, { _id: req.body._id }, { email: req.body.email }]
        });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }
        const checkPassword = await user.checkPW(req.body.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const accessToken = signToken(user);
        const longToken = refreshToken(user) //save refresh to db
        //const refreshUser = await user.update({ refreshToken: longToken })
        const refreshUser = await User.updateOne({ user },{ refreshToken: longToken })
        res.cookie('jwt', longToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }); 
        res.json({ accessToken, user })
        
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}` })
    }
};

const refreshUserToken = async (req, res) => {
    try {
        //const cookies = req.cookies;
        let cookies = req.headers.cookie;
        console.log(cookies, `req.cookies`);
        //if cookies & if cookies has jwt property
        if (!cookies) {
            return res.status(401);
        }
        //console.log(cookies.jwt, `cookies.jwt`);
        const refreshToken = cookies;
        const foundUser = await User.find({ refreshToken: refreshToken });
        if (!foundUser) {
            return res.status(403);
        }

        const verifyRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!verifyRefresh) {
            return res.status(403);
        }
        const accessToken = signToken(foundUser);
        res.json({ accessToken, foundUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error`})
    }

}

const userLogout = async (req, res) => {

};

const getOneUser = async (req, res) => {
    console.log(req.body);
    try {
        const foundUser = await User.findOne({
            $or: [{ _id: req.body._id }, { policyNo: req.body.policyNo }],
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
    console.log(req.body);
    try {
        const update = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body._id },
            { $set: update },
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

module.exports = {
    getAllUsers,
    createNewUser,
    userLogin,
    refreshUserToken,
    getOneUser,
    updateUser,
}