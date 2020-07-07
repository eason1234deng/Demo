const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    oauth_id: Number,
    name: String,
    confirmed: { type: Boolean, default: false },
    joined: {type: Date, default: Date.now },
    credits: { type: Number, default: 0 }
});

module.exports = mongoose.model('users', userSchema);
