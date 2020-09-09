const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    userType: {
        type: String,
        enum: ["ADMIN","MANAGER","DELIVERY","USER"]
    },
    phoneNumber: {
        type: Number
    },
    address: {
        doorNumber: {
            type: String,
            required: true
        },
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        landmark: {
            type:String
        }
    },
    geoLocation: {
        type: {
            type: String,
            default: "point",
            enum: "Point"
        },
        coordinates: [Number]
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = { User }