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
/* referencia para fazer o forEach https://github.com/tryber/sd-016-b-store-manager/pull/63/commits/ff331aaf7047905862871cbd6b0a1cdb6f5550cb */
const createSale = async (sales) => {
  const saleId = await salesModel.createRegisterInTableSales();
  sales.forEach(async ({ productId, quantity }) => {
    await salesModel.createSale({ id: saleId, productId, quantity });
  });
  const newSale = { id: saleId, itemsSold: [...sales] };
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