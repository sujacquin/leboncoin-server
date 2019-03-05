const mongoose = require('mongoose');

const Offer = mongoose.model("Offer", {
    _id: String,
    title: String,
    description: String,
    price: Number,
    creator: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },
    created: Date,
    pictures: Array
});

module.exports = Offer;