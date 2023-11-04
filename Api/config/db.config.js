
const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/geo-my-wish';

mongoose.connect(mongodbUrl)
  .then(() => console.info(`Successfully connected to database ${mongodbUrl}`))
  .catch(error => console.error(`An error occurred while connecting to database ${mongodbUrl}` ));