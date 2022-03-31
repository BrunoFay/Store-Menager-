const salesService = require('../services/salesServices');

const getAllSales = async (req, res, next) => {
  try {
    const sales = await salesService.getAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getSalesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = await salesService.getSalesById(id);
    return res.status(sales.status || 200).json(sales.error || sales);
  } catch (error) {
    next(error);
  }
};

const createSale = async (req, res, next) => {
  try {
    const sales = await salesService.createSale(req.body);
    return res.status(201).json(sales);
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = await salesService.updateSale(id, req.body);
    return res.status(201).json(sales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
 };