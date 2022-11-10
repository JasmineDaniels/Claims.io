const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

function validateEmail(email){
    const re = /^([a-z0-9A-Z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,6})?$/
    return re.test(email)
}

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName:{
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
        },
        policyNo: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        assignedAgent: {
            type: Schema.Types.ObjectId,
            ref: 'employee',
        },
        userClaims: [
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
        toJSON:{
            virtuals: true,
        },
        id: false
    },
)

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
// custom method to compare and validate password for logging in
userSchema.methods.checkPW = async function (password) {
    const user = this
    return bcrypt.compareSync(password, user.password);
};

const User = model('user', userSchema);
module.exports = User;