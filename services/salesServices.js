const salesModel = require('../models/salesModels');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  const salesFormated = sales.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
  return salesFormated;
};
const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  const salesFormated = sales.map((sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
  if (!sales.length) {
    return ({ error: { message: 'Sale not found' }, status: 404 });
  }
  return salesFormated;
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

const updateSale = async (id, sales) => {
  const salesIdValidate = await salesModel.getSalesById(id);
  sales.forEach(async ({ productId, quantity }) => {
    await salesModel.updateSale({ productId, quantity, id });
  });
  if (!salesIdValidate.length) {
    return ({ error: { message: 'Sale not found' }, status: 404 });
  }
  const updatedSale = { saleId: Number(id), itemUpdated: [...sales] };
  return updatedSale;
};
const deleteSale = async (id) => {
  const salesIdValidate = await salesModel.getSalesById(id);
  if (!salesIdValidate.length) {
    return ({ error: { message: 'Sale not found' }, status: 404 });
  }
  await salesModel.deleteSale(id);
  return ({ status: 204 });
}

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
  deleteSale
};