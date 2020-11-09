const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const passport = require('passport');
const bcrypt = require("bcrypt");
require("dotenv").config();
// const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
const GUser = mongoose.model("GUser");

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

// router.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}));

// router.get('/google/callback', passport.authenticate('google', {successRedirect: "/",failureRedirect: '/404'}), (req,res) => {
//     // res.redirect('/')
//     res.end("logged in")
// })

module.exports = router;
