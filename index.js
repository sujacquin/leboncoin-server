require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI ||
    "mongodb://localhost/leboncoin",
    { useNewUrlParser: true }
);




const offerRoutes = require('./routes/offer');
const userRoutes = require('./routes/user');


app.use(offerRoutes);
app.use(userRoutes);




app.listen(process.env.PORT || 3001, () => {
    console.log("Server started");
    console.log(process.env.CLOUDINARY_CLOUD_NAME)
});

