// const multer = require("multer");
// const upload = multer({dest: 'public/images/'})

// module.exports = upload;

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const multer = require('multer');

require('dotenv').config()

cloudinary.config({ 
  cloud_name: 'dwccysu29', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET , 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'geo-my-wish',
  },
});


module.exports = multer( { storage: storage } )