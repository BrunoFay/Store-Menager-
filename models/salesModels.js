const connection = require('./connection');

const getAllSales = async() => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales;',
);
return sales;
}
const getSalesById = async(id) => {
  const [sales] = await connection.execute(
    `SELECT * FROM StoreManager.sales
    WHERE id=?;`,[id]
);
return sales;
}
const createSales = async() => {

}
const updateSales = async(id) => {

}
const removeSales = async(id) => {

}
module.exports = {
  getAllSales,
  getSalesById,
  createSales,
  updateSales,
  removeSales,
}
