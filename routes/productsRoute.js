const express = require('express');

const productRouter = express.Router();
const productsController = require('../controllers/productsControllers');
const validateProductMiddleware = require('../middlewares/validateProductsMiddleware');

productRouter
  .get('/', productsController.getAllProducts)
  .post(validateProductMiddleware, productsController.createProduct);

productRouter
  .get('/:id', productsController.getProductsById)
  .put(productsController.updateProduct)
  .delete(productsController.removeProduct);

module.exports = productRouter;