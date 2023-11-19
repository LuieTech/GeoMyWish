const ListGroup = require('../models/list-group.model');
const List = require('../models/list.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  
  const groupId = req.params.groupId;
  const criteria = {user: req.user.id};
  if(groupId){
    criteria.group = groupId;
  }
  List.find(criteria)
    .then(lists => {
      if(lists.length === 0){
        return res.status(404).json({ message: 'Lists not found' });
      }
      res.status(200).json(lists);
    })
    .catch(error => next(error));
};



module.exports.create = (req, res, next) => {
  req.body.user = req.user.id; 
  req.body.group = req.params.groupId;
  List.create(req.body)
    .then(list => res.status(201).json(list))
    .catch(error => next(error));
};

module.exports.update = (req, res, next) => {
  List.findByIdAndUpdate(req.params.listId, req.body, { runValidators: true , new: true })
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
  List.findById(req.params.listId)
    .populate('products') // Esto llenará el campo virtual 'products' con los datos de los productos.
    .populate({
      path: 'store',
      populate: {
        path: 'location' // Asumiendo que 'location' es un campo dentro del modelo 'Store' que también es una referencia.
      }
    })
    .then(list => {
      if(list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: 'List not found' });
      }
    })
    .catch((error) => next(error));
};
