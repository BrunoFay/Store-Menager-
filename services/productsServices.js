const productsModel = require('../models/productsModels');

const checkIfProductAlreadyExistsInDb = async (name) => {
  const product = await productsModel.getProductsByName(name);
  if (!product.length) {
    return { error: { message: 'Product already exists' }, status: 409 };
  }
};
const checkIfProductIdExistInDb = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (!product.length) {
    return ({ error: { message: 'Product not found' }, status: 404 });
  }
};
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
 const productInDb = await checkIfProductAlreadyExistsInDb(product.name);
  if (productInDb.error) return productInDb;
  const newProduct = await productsModel.createProduct(product);
  return newProduct;
};
const updateProduct = async (id, product) => {
  const productInDb = await checkIfProductIdExistInDb(id);
  if (productInDb.error) {
    return productInDb;
  }
  const updatedProduct = await productsModel.updateProduct(id, product);
  return updatedProduct;
};
const removeProduct = async (id) => {
  const productInDb = await checkIfProductIdExistInDb(id);
  if (productInDb.error) {
    return productInDb;
  }
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