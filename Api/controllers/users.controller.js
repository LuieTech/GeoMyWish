const User = require('../models/user.model');


module.exports.register = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  
  // return res.json({});
  
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: req.file?.path,
  })
    .then(user => res.status(201).json(user))
    .catch(next);

}

module.exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(user) {
        return user.checkPassword(req.body.password)
          .then(match => {
            if(match) {
              req.session.userId = user.id;
              console.log(user);
              
              res.status(200).json(user)
            } else {
              res.status(404).json({message: 'User or Password incorrect'})
            }
          })
      } else {
        res.status(404).json({message: 'User not found'})
      }
    })
    .catch(next)  
}

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.status(204).json({message: 'Logout successful'});
}