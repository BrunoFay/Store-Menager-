
const validateSalesMiddleware = (req, res, next) => {
 
  const arrayProduct = req.body;
  arrayProduct.forEach(sale=>{
    if (!sale.productId) return res.status(400).json({ message: '"productId" is required' });
    if (!sale.quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (sale.quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  })
  next();
};

module.exports = validateSalesMiddleware;