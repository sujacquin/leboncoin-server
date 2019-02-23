const mongoose = require('mongoose');

const Offer = mongoose.model("Offer", {
    _id: String,
    title: String,
    description: String,
    price: Number,
    creator: {
        account: {
            username: String,
            phone: String
        },
        _id: String
    },
    created: Date
});

module.exports = Offer;