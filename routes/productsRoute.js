const express = require('express');

const productRouter = express.Router();
const productsController = require('../controllers/productsControllers');
const validateProductMiddleware = require('../middlewares/validateProductsMiddleware');

productRouter.get('/', productsController.getAllProducts);
productRouter.post('/', validateProductMiddleware, productsController.createProduct);

productRouter.get('/:id', productsController.getProductsById);
productRouter.put('/:id', validateProductMiddleware, productsController.updateProduct);
productRouter.delete('/:id', productsController.removeProduct);

module.exports = productRouter;