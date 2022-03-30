const productsModel = require('../models/productsModels');

const getAllProducts = async () => {
  try {
    const products = await productsModel.getAllProducts();
    return products;
  } catch (error) {
    throw error;
  }
}
const getProductsById = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (!product.length) {
    return ({ error: { message: "Product not found" }, status: 404 });
  }
  return product;

}
const createProduct = async (product) => {
  try {
    const newProduct = await productsModel.createProduct(product);
    return newProduct;
  } catch (error) {
    throw error;
  }
}
const updateProduct = async (id, product) => {
  try {
    const updatedProduct = await productsModel.updateProduct(id, product);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}
const removeProduct = async (id) => {
  try {
    const removedProduct = await productsModel.removeProduct(id);
    return removedProduct;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  removeProduct,
}