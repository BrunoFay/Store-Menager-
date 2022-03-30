const express = require('express');
const saleRouter = express.Router();
const salesController = require('../controllers/salesControllers');

saleRouter
  .get('/', salesController.getAllSales)
  .post(salesController.createSale);

saleRouter
  .get('/:id', salesController.getSalesById)
  .put(salesController.updateSale).delete(salesController.removeSale);


module.exports = saleRouter;