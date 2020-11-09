require('dotenv').config()

const mongoose = require('mongoose');
const connection = process.env.DB;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log("Database error is" + err));