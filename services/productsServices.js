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
  return product[0];
};

const checkIfProductAlreadyExistsInDb = async (name) => {
  const product = await productsModel.getProductsByName(name);
  if (product.length) {
    return { error: { message: 'Product already exists' }, status: 409 };
  }
};
const createProduct = async (product) => {
  const productInDb = await checkIfProductAlreadyExistsInDb(product.name);
  if (productInDb) return productInDb;
  const newProduct = await productsModel.createProduct(product);
  return newProduct;
};
const checkIfProductIdExistInDb = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (!product.length) {
    return ({ error: { message: 'Product not found' }, status: 404 });
  }
};
const updateProduct = async (product, id) => {
  const productInDb = await checkIfProductIdExistInDb(id);
  if (productInDb) return productInDb;
  const productUpdated= await productsModel.updateProduct(product, id);
  return productUpdated;
};
const removeProduct = async (id) => {
  const productInDb = await checkIfProductIdExistInDb(id);
  if (productInDb) return productInDb;
  await productsModel.removeProduct(id);  
};
module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  removeProduct,
};