const productsService = require('../services/productsServices');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await productsService.getProductsById(id);
    return res.status(products.status || 200).json(products.error || products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const productObj = { name, quantity };
  try {
    const products = await productsService.createProduct(productObj);
    return res.status(products.status || 201).json(products.error || products);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const productObj = { name, quantity };
    const products = await productsService.updateProduct(id, productObj);
    return products;
  } catch (error) {
    next(error);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await productsService.removeProduct(id);
    return products;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  removeProduct,
};