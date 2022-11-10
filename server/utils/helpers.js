const { User, Employee, Claim } = require('../models');


module.exports = {
    findClients: async function (employeeData) {
        const promise = User.find({ assignedAgent: employeeData._id}).exec();
        const clients = promise.then((response) => {
            return response
        })
        return clients
    },
};