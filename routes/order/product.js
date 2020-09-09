var express = require('express');
var router = express.Router();
const { Product } = require("../../model/product")

router.get("/product-list", async (req,res) => {
    try {
        let products = await Product.find({publish:true});
        res.json(products)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
})

router.get("/", (req,res) => {
    res.json({
        message: "work"
    })
 })

module.exports = router;