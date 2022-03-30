const productsService = require('../services/productsService');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
    
  } catch (error) {
    next(error);
  }
}

const getProductsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await productsService.getProductsById(id);
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

const createProduct = async (req, res, next) => {
  try {
    const products = await productsService.createProduct(req.body);
    return products;
  } catch (error) {
    next(error);
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const products = await productsService.updateProduct(id, name, quantity);
    return products;
  } catch (error) {
    next(error);
  }
}

const removeProduct = async (req, res, next) => {
  try {
    const products = await productsService.removeProduct(req.params.id);
    return products;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  removeProduct,
}