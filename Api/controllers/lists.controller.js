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
    .populate('group')
    .then(lists => {
      //console.log("Estas son las listas desde el controlador: ", lists)
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
  // console.log("Este es el listId desde el controlador: ", req.params.listId) esto esta funcionando bien
   console.log("Este es el req.body desde el controlador: ", req.body) //esto tambien esta funcionando bien
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
  List.findByIdAndDelete(req.params.listId)
    .then(list => {
      if(list) {
        res.status(204).json({message: 'List deleted!!!'})
      } else {
        next(createError(404, 'List not found'))
      }
    })
    .catch((error) => next(error));
}

module.exports.details = (req, res, next) => {
  //console.log("Este es el listId de la lista desde el controlador: ", req.params.listId)
  List.findById(req.params.listId)
    .populate('group')
    .populate('store')
    .populate('products') 
    .then(list => {
      if(list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: 'List not found' });
      }
    })
    .catch((error) => next(error));
};
