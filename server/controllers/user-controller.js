const { User } = require('../models');

const createNewUser = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create(req.body);
        if (!user) {
            return res.status(400).json({ message: 'Duplicate entry' });
        }
        res.json(user); // add token
    } catch (error) {
        res.status(500).json({ message: `${error}`})
    }
}

const userLogin = async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({ $or: [{ policyNo: req.body.policyNo },{ firstName: req.body.firstName, lastName: req.body.lastName }, { email: req.body.email }] });
        if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
        } 
        const checkPassword = await user.checkPW(req.body.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        res.json({ message: `Found user`, user}) // add Token
    } catch (error) {
        res.status(500).json({ message: `Unauthorized User`, errorMessage: `${error}`})
    }
    
}

module.exports = {
    createNewUser,
    userLogin,
}