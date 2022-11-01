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

module.exports = {
    createNewUser,
}