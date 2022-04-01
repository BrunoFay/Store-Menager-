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

const updateProduct = async (Product, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?;',
    [Product.name, Product.quantity, id],
  );
  return { id: Number(id), ...Product };
};
const removeProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id=?;', [id],
  );
  return { message: 'Product removed' };
};
module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  removeProduct,
  getProductsByName,
};