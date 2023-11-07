const User = require('../models/user.model');


module.exports.register = (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);

}

module.exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(user) {
        user.checkPassword(req.body.password)
          .then(match => {
            if(match) {
              req.session.userId = user.id;
              res.status(200).json({message: 'User logged in'})
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