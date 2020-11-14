const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const User = mongoose.model("User");
const GUser = mongoose.model("GUser");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
require("dotenv").config();
// const passport = require('passport');
// const requireLogin = require("../middleware/requireLogin");

const  transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: process.env.NODE_MAILER
  }
}))

router.get("/404", (req, res) => {
  res.json({ message: "404 page" });
});

router.post("/guser", (req, res) => {
  const { id, name, email, photoUrl } = req.body;
  if (!id | !name | !email | !photoUrl) {
    res.send("some field is missing");
  }
  const guser = new GUser({
    id,
    name,
    email,
    photoUrl,
  });
  GUser.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(200)
        .json({ error: "user already exists with that email" });
    }
    guser
      .save()
      .then(() => {
        res.json({ message: "user has been Successfully" });
      })
      .catch((err) => console.log(err));
  });
});

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.status(402).json({ error: "Some data is missing" });
  } else {
    User.findOne({ email: email })
      .then((savedUsser) => {
        if (savedUsser) {
          return res
            .status(422)
            .json({ error: "user already exists with that email" });
        }
        bcrypt.hash(password, 12).then((hashedpassword) => {
          const user = new User({
            email,
            password: hashedpassword,
            name,
            pic
          });
          user
            .save()
            .then(() => {
              transporter.sendMail({
                to:user.email,
                from:"rohithkumar1319@gmail.com",
                subject:"signup successfully",
                html:"<h1>Welcome to smedia</h1>"
              })
              res.json({ message: "saved Successfully" });
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(402).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(402).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        savedUser.password = undefined;
        if (doMatch) {
          // res.json({message:"user signin successfully"})
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          res.json({ token: token, user: savedUser });
        } else {
          res.status(402).json({ error: "Invalid Password" });
        }
      })
      .catch((err) => console.log(err));
  });
});

router.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from:"rohithkumar1319@gmail.com",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                  `
              })
              res.json({message:"check your email"})
          })

      })
  })
})

router.post('/new-password',(req,res)=>{
 const newPassword = req.body.password
 const sentToken = req.body.token
 User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
 .then(user=>{
     if(!user){
         return res.status(422).json({error:"Try again session expired"})
     }
     bcrypt.hash(newPassword,12).then(hashedpassword=>{
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser)=>{
            res.json({message:"password updated success"})
        })
     })
 }).catch(err=>{
     console.log(err)
 })
})


// router.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}));

// router.get('/google/callback', passport.authenticate('google', {successRedirect: "/",failureRedirect: '/404'}), (req,res) => {
//     // res.redirect('/')
//     res.end("logged in")
// })

module.exports = router;
