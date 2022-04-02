const express = require('express');

const saleRouter = express.Router();
const salesController = require('../controllers/salesControllers');
const { validateSalesMiddleware } = require('../middlewares/validateSalesMiddleware');

saleRouter.get('/', salesController.getAllSales);
saleRouter.post('/', validateSalesMiddleware, salesController.createSale);

saleRouter.get('/:id', salesController.getSalesById);
saleRouter.put('/:id', validateSalesMiddleware, salesController.updateSale);
saleRouter.delete('/:id', salesController.deleteSale);
module.exports = saleRouter;