const {User} = require('../models/user');

const createUser = async(body) => User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    age: body.age,
});

module.exports = {
    createUser,
}