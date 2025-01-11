const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    referralCode: {
        type: String,
        unique: true,
        default: uuidv4,
    },
    referrals: [
        {
            type: String,
            ref: 'User',
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);