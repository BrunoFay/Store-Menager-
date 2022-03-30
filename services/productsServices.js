const productsModel = require('../models/productsModels');

const getAllProducts = async () => {
    const products = await productsModel.getAllProducts();
    return products;
};
const getProductsById = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (!product.length) {
    return ({ error: { message: 'Product not found' }, status: 404 });
  }
  return product;
};
const createProduct = async (product) => {
    const newProduct = await productsModel.createProduct(product);
    return newProduct;
};
const updateProduct = async (id, product) => {
    const updatedProduct = await productsModel.updateProduct(id, product);
    return updatedProduct;
};
const removeProduct = async (id) => {
    const removedProduct = await productsModel.removeProduct(id);
    return removedProduct;
};
module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  removeProduct,
};