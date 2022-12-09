const { Claim, Employee, User } = require('../models');

const getAllClaims = async (req, res) => {
    try {
        const allClaims = await Claim.find({});
        res.json(allClaims)
    } catch (error) {
        res.status(500).json(error)
    }
};

const createAClaim = async (req, res) => {
    console.log(req.body);
    try {
        const claim = await Claim.create(req.body);
        const updateEmployee = await Employee.findByIdAndUpdate(
            {_id: req.body.agent_id},
            {$addToSet: { employeeClaims: claim._id }},
            {new: true},
        );
        const updateClient = await User.findByIdAndUpdate(
            {_id: req.body.client_id},
            {$addToSet: { userClaims: claim._id }},
            {new: true},
        );
        if (!updateEmployee || !updateClient){
            return res.status(400).json({ message: `Agent & Client id must be provided`})
        }
        res.json({ message: `Claim successfully created`, claim})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Internal Server Error`})
    }
};

const getAClaim = async (req, res) => {
    console.log(req.body);
    try {
        const claim = await Claim.findOne({ _id: req.params._id })
            .populate('agent_id')
            .populate('client_id');
        claim ? res.json(claim) : res.status(404).json({ message: `No claim with this id ${req.params._id}`})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error`})
    }
};

const updateAClaim = async (req, res) => {
    console.log(req.body);
    const update = req.body;
    try {
        const claim = await Claim.findByIdAndUpdate(
            {_id: req.params._id},
            {$set: update},
            {new: true},
        );
        if (!claim){
            return res.status(404).json({ message: `No claims with this id ${req.body._id}`})
        }
        res.json(claim);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error` }) 
    }
};

const deleteAClaim = async (req, res) => {
    console.log(req.body);
    try {
        await Claim.findByIdAndDelete({_id: req.params._id})
        const updateEmployee = await Employee.findByIdAndUpdate(
            {_id: req.body.agent_id},
            {$pull: { employeeClaims: req.params._id }},
            {runValidators: true, returnOriginal: false},
        );
        const updateClient = await User.findByIdAndUpdate(
            {_id: req.body.client_id},
            {$pull: { userClaims: req.params._id }},
            {runValidators: true, returnOriginal: false},
        )
        if (!updateEmployee || !updateClient){
            return res.status(204).json({ message: `Claim was deleted, but was not assigned to Client and/or Agent.`})
        }
        res.json( { message: `Claim successfully closed ` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error` })
    }
};

module.exports = {
    getAllClaims,
    createAClaim,
    getAClaim,
    updateAClaim,
    deleteAClaim,
}