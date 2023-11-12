const ListGroup = require('../models/list-group.model');

module.exports.create = (req, res, next) => {
  req.body.user = req.user.id
  ListGroup.create(req.body)
    .then(group => res.status(201).json(group))
    .catch(error => next(error));  
}

module.exports.list = (req, res, next) => {

  ListGroup.find({ user: req.user.id})
    .populate({
      path: 'lists',
      populate: {
        path: 'products',
        model: 'Product'
      }
    })
    .then(groups => res.status(200).json(groups))
    .catch(next)
}

module.exports.details = (req, res, next) => {
  ListGroup.findOne({ _id: req.params.id, user: req.user.id })
    .populate('lists')
    .then(group => {
      if(group) {
        res.status(200).json(group)
      } else {
        res.status(404).json({ message: 'Not found'})
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {

  ListGroup.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then(group => {
      if(group) {
        res.status(200).json(group)
      } else {
        res.status(404).json({ message: 'Group not found'})
      }
    })
    .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
  ListGroup.findByIdAndDelete(req.params.id)
    .then(group => {
      if(group) {
        res.status(204).send()
      } else {
        res.status(404).json({ message: 'Group not found'})
      }
    })
    .catch(next)
}