const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const meetingSchema = require('./Meeting');

const employeeSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        role: Number,
        password: {
            type: String,
            required: true,
        },
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

employeeSchema.pre('save', async function (next) {
    if (this.isNew) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});


//if (this._update.$set.password.isModified) { 
// employeeSchema.pre('findOneAndUpdate', function () {
//     const saltRounds = 10;
//     this._update.$set.password =  bcrypt.hashSync(this._update.$set.password, saltRounds)
// });
  
  
// custom method to compare and validate password for logging in
employeeSchema.methods.checkPW = async function (password) {
    const user = this
    return bcrypt.compareSync(password, user.password);
};

const Employee = model('employee', employeeSchema);
module.exports = Employee;