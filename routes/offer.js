const express = require("express");
const uid2 = require("uid2");
const router = express.Router();
const Offer = require('../models/offer');
const User = require('../models/user');
var uploadPictures = require("../middlewares/uploadPictures");


// Publish

router.post("/offer/publish", uploadPictures, async (req, res) => {
    try {

        const bearerToken = req.headers.authorization
        console.log(bearerToken);
        console.log(req.pictures);

        if (bearerToken) {

            const token = bearerToken.slice(7);

            const user = await User.findOne({ token: token });

            const newOffer = new Offer({
                _id: uid2(26),
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                creator: user,
                created: new Date(),
                pictures: req.pictures

            });
            await newOffer.save();

            res.json({
                _id: newOffer._id,
                title: newOffer.title,
                description: newOffer.description,
                price: newOffer.price,
                created: newOffer.created,
                creator: {
                    account: {
                        username: user.account.username

                    },
                    _id: user._id
                },
                pictures: newOffer.pictures
            });
        } else {
            res.status(400).json({
                message: "Unauthorized"
            });
        }



    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// Read

router.get("/offer/with-count", async (req, res) => {
    try {

        const allOffers = await Offer.find()

        const offers = await Offer.find().skip(Number(req.query.skip)).limit(Number(req.query.limit));

        res.json({ count: allOffers.length, offers });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});



// read by id

router.get("/offer/:id", async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id).populate("creator", "account");


        res.json(offer);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});



module.exports = router;