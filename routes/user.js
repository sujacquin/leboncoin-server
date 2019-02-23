const express = require("express");
const router = express.Router();
const Offer = require('../models/offer');
const User = require('../models/user');

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//Sign-up

router.post("/user/sign_up", async (req, res) => {
    try {

        const existingUsername = await User.findOne({ account: { username: req.body.username } })
        const existingEmail = await User.findOne({ email: req.body.email })


        if (existingUsername === null && existingEmail === null) {
            const password = req.body.password;
            const salt = uid2(16);
            const hash = SHA256(password + salt).toString(encBase64);

            const newUser = new User({
                email: req.body.email,
                _id: uid2(24),
                token: uid2(16),
                salt: salt,
                hash: hash,
                account: {
                    username: req.body.username
                }
            });
            await newUser.save();


            res.json({
                _id: newUser._id, token: newUser.token, account: newUser.account
            });

        } else {
            res.status(400).json({
                error: {
                    message: "Username and/or email already in use"
                }
            })
        }

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

//Log-in

router.post("/user/log_in", async (req, res) => {
    try {


        const user = await User.findOne({ email: req.body.email })
        const password = req.body.password;

        if (SHA256(password + user.salt).toString(encBase64) === user.hash) {
            res.json({
                _id: user._id, token: user.token, account: user.account
            });
        }

        else {
            res.status(400).json({
                error: {
                    message: "Incorrect password"
                }
            })
        }

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


module.exports = router;
