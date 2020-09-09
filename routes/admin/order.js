var express = require('express');
var router = express.Router();
const {authenticate,permit} = require('../../library/authenticate');
const {Order} = require('../../model/order');

router.get("/",[authenticate,permit("USER")],async (req,res) => {
    let order = await Order.find();
    res.json(order);
})

module.exports = router;