const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginSchema = new Schema({
    email: String,
    hash: String
});

module.exports = mongoose.model('logins', loginSchema);
