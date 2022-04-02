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
};
const updateSale = async (sales) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET product_id = ?, quantity=? WHERE sale_id = ?;',
    [sales.productId, sales.quantity, sales.id],
  );
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  ); await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;',
    [id],
  );

}
module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
  createRegisterInTableSales,
  deleteSale,
};
