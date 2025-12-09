require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModel = require('../models/userModel'); // make sure this exists

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Prepare user data
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
        };

        // Check if user exists
        let user = await userModel.getUserById(profile.id);
        if (!user) {
          // Create user if not exists
          await userModel.createNewUser(newUser);
        }

        return done(null, profile);
      } catch (err) {
        done(err);
      }
    }
  )
);

// Save user ID in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user from ID stored in session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
