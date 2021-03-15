const mongoose = require('mongoose');

const users = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
});

module.exports = {
    User: mongoose.model('users', users),
};