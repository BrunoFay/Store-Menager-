/* referencia para fazer o map https://stackoverflow.com/questions/35449664/grab-the-return-value-and-get-out-of-foreach-in-javascript */

const checkErrorExistOnProductAndQuantity = (array) => {
  const response = array.map((sale) => {
    if (!sale.productId) {
      return [400, { message: '"productId" is required' }];
    }
    if (!sale.quantity && sale.quantity !== 0) {
      return [400, { message: '"quantity" is required' }];
    }
    if (sale.quantity < 1) {
      return [422, { message: '"quantity" must be greater than or equal to 1' }];
    }
    return null;
  });
  return response[0];
};
const validateSalesMiddleware = (req, res, next) => {
  const arrayProduct = req.body;
  const error = checkErrorExistOnProductAndQuantity(arrayProduct);
  console.log(error);
  if (error) {
    const [status, message] = error;
    return res.status(status).json(message);
  }

  next();
};

module.exports = {
  validateSalesMiddleware,
};