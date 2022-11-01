const { model, Schema } = require('mongoose');

const claimsSchema = new Schema(
    {
        status: String, // in progress, payment issued, resolved
        totaled: Boolean,
        medium: String, //car, home, boat, etc
        client: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        specialist: {
            type: Schema.Types.ObjectId,
            ref: 'employee',
        },
        damages: {
            type: String,
            minLength: 0,
            maxLength: 2000,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },  
    }
)

const Claim = model('claim', claimsSchema)
module.exports = Claim;