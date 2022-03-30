const productsModel = require('../models/productsModel');

const getAllProducts= async() => {
  try {
    const products = await productsModel.getAllProducts();
    return products;
  } catch (error) {
    throw error;
  }
}
const getProductById = async(id) => {
  try {
    const product = await productsModel.getProductById(id);
    return product;
  } catch (error) {
    throw error;
  }
}
const createProduct = async(product) => {
  try {
    const newProduct = await productsModel.createProduct(product);
    return newProduct;
  } catch (error) {
    throw error;
  }
}
const updateProduct = async(id, product) => {
  try {
    const updatedProduct = await productsModel.updateProduct(id, product);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}
const removeProduct = async(id) => {
  try {
    const removedProduct = await productsModel.removeProduct(id);
    return removedProduct;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
}