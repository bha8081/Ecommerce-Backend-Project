const mongoose = require("mongoose");

/**
 *  name
 *  userId
 *  password
 *  email
 *  userType
 */

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    userId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        minLength: 10,
        unique: true,
        lowercase: true,
        trim: true,
    },

    userType: {
        type: String,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"],
    }

}, {
    timestamps: true,
    versionKey: false,
});

// Create a collection name with the name is Users in puler form.
module.exports = mongoose.model("User", userSchema);