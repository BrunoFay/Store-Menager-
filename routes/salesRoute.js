const express = require('express');

const saleRouter = express.Router();
const salesController = require('../controllers/salesControllers');
const validateSalesMiddleware = require('../middlewares/validateSalesMiddleware');

saleRouter
  .get('/', salesController.getAllSales)
  .post(validateSalesMiddleware, salesController.createSale);

saleRouter
  .get('/:id', salesController.getSalesById)
  .put(salesController.updateSale).delete(salesController.removeSale);

module.exports = saleRouter;