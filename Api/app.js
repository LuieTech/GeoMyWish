require('dotenv').config();
const createError = require('http-errors');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const corsConfig = require('./config/cors.config');

require('./config/db.config.js');
const sessionConfig = require('./config/session.config');
const app = express();

app.use(express.json());

app.use(logger('dev'));
app.use(sessionConfig.session);
app.use(sessionConfig.loadSession);
app.use(corsConfig);

app.use(express.static("public"))


const api = require('./config/routes.config');
app.use('/v1', api);

app.use(require('./web'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));