const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  try {
    const sales = await salesModel.getAllSales();
    return sales;
  } catch (error) {
    throw error;
  }
}
const getSalesById = async (id) => {
  try {
    const sales = await salesModel.getSalesById(id);
    return sales;
  } catch (error) {
    throw error;
  }
}
const createSale = async (sale) => {
  try {
    const newSale = await salesModel.createSale(sale);
    return newSale;
  } catch (error) {
    throw error;
  }
}
const updateSale = async (id, sale) => {
  try {
    const updatedSale = await salesModel.updateSale(id, sale);
    return updatedSale;
  } catch (error) {
    throw error;
  }
}
const removeSale = async (id) => {
  try {
    const removedSale = await salesModel.removeSale(id);
    return removedSale;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
  removeSale,
}