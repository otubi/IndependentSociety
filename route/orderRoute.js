

const express = require("express");
const controller = require("./../controller/genericControler");
const {PurchaseOrder} = require('./../Models/modelHubs');
const Orders = controller(PurchaseOrder, "order");
const Router = express.Router();

Router
     .route('/')
     .post(Orders.add)
     .get(Orders.getAll)


Router
     .route('/:id')
     .patch(Orders.update)
     .get(Orders.getOne)
     .delete(Orders.delete)

Router
    .route("/:search") 
    .get(Orders.getByQuery)


module.exports = Router;