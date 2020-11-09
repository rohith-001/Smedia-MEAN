const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();
const GUser = mongoose.model("GUser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const newGUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      }
      try {
        let user = await GUser.findOne({ googleId: profile.id });
        if (user) {
          cb(null, user);
        } else {
          user = await GUser.create(newGUser);
          cb(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
