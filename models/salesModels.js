const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS sa
    INNER JOIN sales_products AS sp
    ON sa.id = sp.sale_id ORDER BY sp.product_id ;`,
  );
  return sales;
};
const getSalesById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT sa.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS sa
    INNER JOIN sales_products AS sp
    ON sa.id = sp.sale_id
    WHERE sp.sale_id =? ORDER BY sp.product_id;`, [id],
  );

  return sales;
};
const createRegisterInTableSales = async () => {
  const [sales] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES (NOW());',
  );
  return sales.insertId;
};
const createSale = async (newSaleToDb) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id,product_id,quantity) VALUES (?,?,?);',
    [newSaleToDb.id, newSaleToDb.productId, newSaleToDb.quantity],
  );
  await connection.execute(
    'UPDATE StoreManager.products SET quantity=quantity - ? WHERE id = ?;',
    [newSaleToDb.quantity, newSaleToDb.productId],
  );
};
const updatedProductWhenUpdateSale = async (sales) => {
  const [quantity] = await connection.execute(
    'SELECT quantity FROM StoreManager.sales_products WHERE sale_id = ? AND product_id = ?;',
    [sales.id, sales.productId],
  );
  const quantityFormated = quantity[0].quantity;
  await connection.execute(
    'UPDATE StoreManager.products SET quantity=quantity + ? WHERE id = ?;',
    [quantityFormated, sales.productId],
  );
};
const updateSale = async (sales) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET product_id = ?, quantity=? WHERE sale_id = ?;',
    [sales.productId, sales.quantity, sales.id],
  );
  await connection.execute(
    'UPDATE StoreManager.products SET quantity=quantity - ? WHERE id = ?;',
    [sales.quantity, sales.productId],
  );
};
const checkQuantityOfProducts = async (productId) => {
  const [quantityOfProducts] = await connection.execute(
    'SELECT quantity FROM StoreManager.products WHERE id = ?;',
    [productId],
  );
  return quantityOfProducts;
};
const updatedSaleWhenDelete = async (id) => {
  const [quantityAndProductId] = await connection.execute(
    'Select quantity,product_id FROM StoreManager.sales_products WHERE sale_id = ?;',
    [id],
  );
  quantityAndProductId.forEach(async ({ quantity, product_id: productId }) => {
    await connection.execute(
      'UPDATE StoreManager.products SET quantity=quantity + ? WHERE id = ?;',
      [quantity, productId],
    );
  });
};
const deleteSale = async (id) => {
  updatedSaleWhenDelete(id);
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  );
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;',
    [id],
  );
};
module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
  createRegisterInTableSales,
  deleteSale,
  updatedProductWhenUpdateSale,
  checkQuantityOfProducts,
};
