const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')

module.exports.session = expressSession({
  secret: process.env.SESSION_SECRET || "super-secret (change it)",
  proxy: process.env.SESSION_SECURE === "true",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:mongoose.connection._connectionString,
    ttl: 14 * 24 * 60 * 60,
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === "true",
  },
});