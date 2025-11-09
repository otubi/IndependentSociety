

const express = require("express");
const controller = require("./../controller/genericControler");
const {purchaseRequisition} = require('./../Models/modelHubs');
const Requisition = controller(purchaseRequisition, "requisition");
const Router = express.Router();


Router
     .route("/")
     .get(Requisition.getAll)
     .post(Requisition.add)

Router
     .route("/:id")
     .get(Requisition.getOne)
     .patch(Requisition.update)
     .delete(Requisition.delete)

Router.route("/search") 
      .get(Requisition.getByQuery)

      
module.exports = Router;