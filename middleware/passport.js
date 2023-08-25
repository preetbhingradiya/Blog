import { Strategy } from "passport-local";
import { user } from "../model/user-schema.js";

export const Authenticate = (passport) => {
  passport.use(
    new Strategy(async (username, password, done) => {
      const data = await user.findOne({ username });

      if (!data) return done(null, false);
      if (data.password !== password) return done(null, false);

      return done(null, data);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const value = await user.findById( id );
    done(null, value);
  });
};
