const { User, Employee, Claim } = require('../models');


module.exports = {
    findClients: async function (employeeData) {
        const promise = User.find({ assignedAgent: employeeData}).exec();
        const clients = promise.then((response) => {
            return response
        })
        return clients
    },

    // Find All Claims by Any User or by A Claim ID.
    findClaimsByID: async function (data) {
        //const promise = Claim.find({ agent_id: employeeData}).populate('agent_id').populate('client_id').exec();
        const promise = Claim.find({ $or: [{ agent_id: data }, { _id: data }, { client_id: data }] }).exec();
        const claims = promise.then((response) => {
            return response
        })
        return claims
    },

    findClientClaims: async function (userData) {
        //const promise = Claim.find({ agent_id: employeeData}).populate('agent_id').populate('client_id').exec();
        const promise = Claim.find({ $or: [{ _id: userData }, { client_id: userData }] }).exec();
        const claims = promise.then((response) => {
            return response
        })
        return claims
    },
};