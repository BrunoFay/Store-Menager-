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
const createSale = async (newSaleToDb, newSaleObj) => {
const [newSale] = await connection.execute(
  'INSERT INTO StoreManager.sales_products (sale_id,product_id,quantity) VALUES (?);',
  [newSaleToDb],
);
const newSaleReply = {
  id: newSale.insertId,
  itemsSold: newSaleObj,
};
return newSaleReply;
};
const updateSale = async (id) => {};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
  createRegisterInTableSales,
};
