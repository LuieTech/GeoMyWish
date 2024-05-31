const List = require('../models/list.model');
const Store = require('../models/store.model');
const createError = require('http-errors');
const mongoose = require('mongoose');


module.exports.list = (req, res, next) => {
  const criteria = {};
  const listId = req.params.listId;
  List.findById(listId)
    .then(list => {
      if(!list){
        return next(createError(404, 'List not found'));
      }
      if(list.user.toString() !== req.user.id){
        return next(createError(403, 'Forbidden'));
      }
      criteria.list = listId;
      Store.find(criteria)
        .then(stores => {
          if(stores.length === 0){
            return next(createError(404, 'Stores not found'));
          }
          res.status(200).json(stores);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const listId = req.params.listId;
  const newStore = {
    ...req.body,
    user: req.user.id,
    list: listId,
  };
  Store.create(newStore)
    .then(store => res.status(201).json(store))
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Store.findByIdAndDelete(req.params.storeId)
    .then(store => {
      if(store) {
        res.status(204).json()
      } else {
        res.status(404).json({ message: 'Store not found'})
      }
    })
    .catch(next)
}

// store.controller.js

exports.findNearbyStores = (req, res, next) => {
  const { lat, lng } = req.query;

  Store.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
        $minDistance: 1000,
        $maxDistance: 5000
      }
    }
  })
  .then(stores => res.status(200).json(stores))
  .catch(next);
};
