var express = require('express');
var router = express.Router();
const {authenticate,permit} = require('../../library/authenticate');
const {Product} = require('../../model/product');

router.get("/",[authenticate,permit("USER")],async (req,res) => {
    let product = await Product.find();
    res.json(product);
})

router.post("/",[authenticate,permit("USER")],async (req,res) => {

    var product = new Product(req.body);
    await product.save();
    res.json({
        message: "Product Created!"
    })
})

router.get("/:productId",[authenticate,permit("USER")],async (req,res) => {
    var product = await Product.findById(req.params.productId);
    res.json(product);
})

router.put("/:productId",[authenticate,permit("USER")],async (req,res) => {
    var product = await Product.findByIdAndUpdate(req.params.productId,req.body);
    res.json({
        message: "Updated"
    });
    
})

module.exports = router;