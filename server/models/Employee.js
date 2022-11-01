const { model, Schema } = require('mongoose');
const meetingSchema = require('./Meeting');

const employeeSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        role: Number,
        clients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        employeeClaims: [
            {
                type: Schema.Types.ObjectId,
                ref: 'claims',
            },
        ],
        meetings: [meetingSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

const Employee = model('employee', employeeSchema);
module.exports = Employee;