const { Schema } = require('mongoose');

const meetingSchema = new Schema(
    {
        link: String,
        meetingDate: Date,
        clients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        specialists: [
            {
                type: Schema.Types.ObjectId,
                ref: 'employee',
            },
        ],
        description: {
            type: String,
            minLength: 0,
            maxLength: 2000,
        },
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
    }
);
module.exports = meetingSchema;