

const express = require("express");
const controller = require("./../controller/genericControler");
const {user} = require('./../Models/modelHubs');
const userController = controller(user, "user");
const Router = express.Router();

Router
     .route('/')
     .post(userController.add)
     .get(userController.getAll)

Router
     .route('/:id')
     .get(userController.getOne)
     .patch(userController.update)
     .delete(userController.delete)

Router.route("/:search") 
      .get(userController.getByQuery)


module.exports = Router;