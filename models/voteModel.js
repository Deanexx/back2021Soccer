const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: []
    }],
    maxPlayers: { 
        type: Number,
        default: 22
    },
    isGoals: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0]
        }
    }
},
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true }
})

voteSchema.virtual("totalUsers").get(function() {
    return this.users.length;
})

module.exports = mongoose.model("Vote", voteSchema)
