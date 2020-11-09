const mongoose = require('mongoose');

const GUserSchema = new mongoose.Schema({
    id: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("GUser",GUserSchema);