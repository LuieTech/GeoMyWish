require('dotenv').config();
const createError = require('http-errors');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');

require('./config/db.config.js');
const sessionConfig = require('./config/session.config');
const app = express();


app.use(express.json());
app.use(logger('dev'));
app.use(sessionConfig.session);

const api = require('./config/routes.config');
app.use('/v1', api);

app.use((req, res, next) => next(createError(404, 'Route not found')));

app.use((error, req, res, next) => {

  if(error instanceof mongoose.Error.CastError && error.message.includes('_id')){
    error = createError(404, 'Resource not found');
  } else if(error instanceof mongoose.Error.ValidationError){
      error = createError(400, error);
  } else if(!error.status) {
    error = createError(500, error)
  }
    // console.log(error);
    let errors;
    if(error.errors){
      errors = Object.keys(error.errors)
        .reduce((errors, errorKey) => {
          errors[errorKey] = error.errors[errorKey].message || error.errors[errorKey];
          return errors;
      }, {}) 
    }
  
  const data = {
    message: error.message,
    errors: errors
  }

  res.status(error.status).json(data);

})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));