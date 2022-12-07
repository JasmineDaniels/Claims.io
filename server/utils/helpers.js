const { User, Employee, Claim } = require('../models');


module.exports = {
    findClients: async function (employeeData) {
        const promise = User.find({ assignedAgent: employeeData}).exec();
        const clients = promise.then((response) => {
            return response
        })
        return clients
    },

    findClaims: async function (employeeData) {
        //const promise = Claim.find({ agent_id: employeeData}).populate('agent_id').populate('client_id').exec();
        const promise = Claim.find({ agent_id: employeeData}).exec();
        const claims = promise.then((response) => {
            return response
        })
        return claims
    },
};