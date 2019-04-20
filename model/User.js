const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    age: Number,
    occupation: String
});

module.exports = mongoose.model('Users', userSchema);