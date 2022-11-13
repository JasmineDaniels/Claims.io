const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

function validateEmail(email){
    const re = /^([a-z0-9A-Z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,6})?$/
    return re.test(email)
}

const employeeSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: [validateEmail, `Please enter valid email address`],
        },
        password: {
            type: String,
            required: true,
        },
        phoneNo: String,
        refreshToken: String,
        role: {
            User: {
                type: Number,
                default: 2001,
            },
            Agent: {
                type: Number,
                default: 1984,
            },
            Admin: Number
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
        createdAt: {
            type: Date,
            default: Date.now
        }, 
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

//seed employees middleware
employeeSchema.pre('insertMany', async function (next, docs){
    if (Array.isArray(docs) && docs.length){
        const hashedUsers = docs.map(async (user) => {
            return await new Promise((resolve, reject) => {
               bcrypt.genSalt(10).then((salt) => {
                let password = user.password.toString()
                bcrypt.hash(password, salt).then(hash => {
                    user.password = hash
                    resolve(user)
                }).catch(e => {
                    reject(e)
                })
               })
            })
        })
        docs = await Promise.all(hashedUsers)
        next()
    } else {
        return next(new Error('Employee list should not be empty'))
    }
})
  
  
// custom method to compare and validate password for logging in
// employeeSchema.methods.checkPW = async function (password) {
//     const user = this
//     return bcrypt.compareSync(password, user.password);
// };

// employeeSchema.methods.checkPW = async function (password) {
//     const user = this
//     return bcrypt.compare(password, user.password);
// };

const Employee = model('employee', employeeSchema);
module.exports = Employee;