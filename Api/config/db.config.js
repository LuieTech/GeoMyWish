
const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGODB_URL || '';

mongoose.connect(mongodbUrl)
  .then(() => console.info(`Successfully connected to database ${mongodbUrl}`))
  .catch(error => console.error(`An error occurred while connecting to database ${mongodbUrl}`, error ));

  // const mongoose = require('mongoose');

  // mongoose.connect(process.env.MONGODB_URL, {
  //   ssl: true, // Asegura que SSL está habilitado
  //   sslValidate: true, // Asegura que se valida el certificado SSL
  // }).then(() => {
  //   console.log('Connected to MongoDB');
  // }).catch((error) => {
  //   console.error('Error connecting to MongoDB:', error);
  // });