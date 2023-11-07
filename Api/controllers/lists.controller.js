const List = require('../models/list.model');

module.exports.list = (req, res, next) => {

  const criteria = {};
  const { title } = req.query;

  if(title) {
    criteria.title = new RegExp(title, 'i');
  }

  List.find(criteria)
    .then(lists => res.status(200).json(lists))
    .catch(next)
};

module.exports.create = (req, res, next) => {
  List.create(req.body)
    .then(list => res.status(201).json(list))
    .catch(next)
}

module.exports.update = (req, res, next) => {
  List.findByIdAndUpdate(req.params.id, req.body, { runValidators: true , new: true })
    .then(list => {
      if(list) {
        res.status(200).json(list)
      } else {
        res.status(404).json({ message: 'List not found'})
      }
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  List.findByIdAndDelete(req.params.id)
    .then(list => {
      if(list) {
        res.status(204).json()
      } else {
        res.status(404).json({ message: 'List not found'})
      }
    })
    .catch(next)
}

module.exports.details = (req, res, next) => {
  List.findById(req.params.id)
    .populate('products')
    .then(list => {
      if(list) {
        res.status(200).json(list)
      } else {
        res.status(404).json({ message: 'List not found'})
      }
    })
    .catch((error) => next(error))
}
