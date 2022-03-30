const express = require('express');
const productRouter = express.Router();
const productsController = require('../controllers/productsControllers');

productRouter
  .get('/', productsController.getAllProducts)
  .post(productsController.createProduct);

productRouter
  .get('/:id', productsController.getProductsById)
  .put(productsController.updateProduct)
  .delete(productsController.removeProduct)


module.exports = productRouter;