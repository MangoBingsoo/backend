const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../schemas/User");
require('dotenv').config()

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("google profile : ", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "google" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile?.email[0].value,
              name: profile.displayName,
              googleid: profile.id,
              provider: "google",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
