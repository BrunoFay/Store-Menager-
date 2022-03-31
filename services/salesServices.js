const salesModel = require('../models/salesModels');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};
const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (!sales.length) {
    return ({ error: { message: 'Sale not found' }, status: 404 });
  }
  return sales;
};
const createSale = async (sales) => {
  const saleId = await salesModel.createRegisterInTableSales();
  const arrayWithSalesToDb = sales.map(item => [saleId, item.productId, item.quantity]);
  console.log(arrayWithSalesToDb);
  const newSale = await salesModel.createSale(arrayWithSalesToDb, sales);
  return newSale;
};
const updateSale = async (id, sale) => {
  const updatedSale = await salesModel.updateSale(id, sale);
  return updatedSale;
};
const removeSale = async (id) => {
  const removedSale = await salesModel.removeSale(id);
  return removedSale;
};
module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
  removeSale,
};