var express = require('express');
var router = express.Router();
var {User} = require("../model/user");
const bcrtypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var userOrderRoute = require("./order/order")
var userProductRoute = require("./order/product")

/* POST users listing. */
router.post('/register', async function(req, res, next) {
  req.body.userType = "USER"

  bcrtypt.genSalt(10,(err,salt) => {
    bcrtypt.hash(req.body.password,salt,async(err,hash)=> {
      req.body.password = hash;
      let user = new User(req.body)
      try {
        await user.save();
        
        res.json({
          message: "User created"
        })
      } catch (error) {
        console.log(error)
        res.status(500).json({
          message: "User not created"
        })
      }
    })
  } )
});

router.post("/login",async (req,res) => {
  let user = await User.findOne({email: req.body.email});
  if(user){

    bcrtypt.compare(req.body.password,user.password,(err,result) => {
      if(err) throw err;
      if(result){

        jwt.sign({id: user._id,type: user.userType},process.env.JWT_SECRET,{expiresIn: "10h"},
        (err,token) => {
          if(err) throw err;
          res.status(200).json({
            message: "Correct",
            token: token
          })
        })       
      }else{
        res.status(200).json({
          message: "Password wrong"
        })
      }
    })
  }else{
    res.status(401).json({
      message: "E-mail not found"
    })
  }
})


router.use("/order", userOrderRoute)

router.use("/product", userProductRoute)



module.exports = router;
