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
        const user = await User.findOne({ 
            $or: [{ policyNo: req.body.policyNo },{ firstName: req.body.firstName, lastName: req.body.lastName }, { email: req.body.email }] 
        });
        if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
        } 
        const checkPassword = await user.checkPW(req.body.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        res.json({ message: `Verified user`, user}) // add Token
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}`})
    }  
};

const getOneUser = async (req, res) => {
    console.log(req.body);
    try {
        const foundUser = await User.findOne({
            $or: [{ _id: req.body._id }, { policyNo: req.body.policyNo }],
        });
      
        if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }
        res.json(foundUser);
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}`})
    }
}

const updateUser = async (req, res) => {
    console.log(req.body);
    try {
        const update = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body._id },
            { $set: update },
            { runValidators: true, returnOriginal: false }
        );
        
        if(!updatedUser){
            return res.status(404).json({ message: "This post doesn't exist."})
        } 
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: `Server Error`, errorMessage: `${error}`})
    };
};

module.exports = {
    createNewUser,
    userLogin,
    getOneUser,
    updateUser,
}