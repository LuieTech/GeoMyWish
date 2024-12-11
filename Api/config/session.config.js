const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')
const User = require("../models/user.model");

module.exports.session = expressSession({
  secret: process.env.SESSION_SECRET || "",
  proxy: process.env.SESSION_SECURE === "true",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:mongoose.connection._connectionString,
    ttl: 14 * 24 * 60 * 60,
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === "",
  },
});

module.exports.loadSession = (req, res, next) => {
  const { userId } = req.session;
  if(userId) {
    User.findById(userId)
      .populate("groups")
      .then((user) => {
        if(user) {
          // res.json(user)
          req.user = user
          next();
        } else {
          next()
        }
      })
      .catch(next)
  } else {
    next();
  }
}

