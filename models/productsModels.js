const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );

  return products;
};
const getProductsById = async (id) => {
  const [products] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE id=? ORDER BY id;`, [id],
  );
  return products;
};
const getProductsByName = async (name) => {
  const [product] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE name=? ;`, [name],
  );
  return product;
};
const createProduct = async (Product) => {
const [newProduct] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [Product.name, Product.quantity],
  );
  return { id: newProduct.insertId, ...Product };
};

const updateProduct = async (id) => {

};
const removeProduct = async (id) => {

};
module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  removeProduct,
  getProductsByName,
};