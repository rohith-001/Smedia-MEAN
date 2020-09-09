var config = module.exports;
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => console.log("db connection success"))
