var express = require('express');
var router = express.Router();
var productRoute = require("./product")
var orderRouter = require('./order');


router.use("/product",productRoute)
router.use('/list-order', orderRouter);


module.exports = router;