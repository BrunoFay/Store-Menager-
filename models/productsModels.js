const connection = require('./connection');

const getAllProducts = async() => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
);

return products;
}
const getProductsById = async(id) => {
  const [products] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE id=?;`,[id]
);
return products;
}
const createProduct = async() => {

}
const updateProduct = async(id) => {

}
const removeProduct = async(id) => {

}
module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  removeProduct,
}