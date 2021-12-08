const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minlength: 2,
        trim: true
    }
})

module.exports = mongoose.model("User", userSchema);