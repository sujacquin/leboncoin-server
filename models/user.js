const mongoose = require('mongoose');

const User = mongoose.model("User", {
    email: String,
    _id: String,
    token: String,
    salt: String,
    hash: String,
    account: {
        username: String,

    }
});

module.exports = User;