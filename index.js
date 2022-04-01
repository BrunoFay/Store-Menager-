const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const productRouter = require('./routes/productsRoute');
const saleRouter = require('./routes/salesRoute');
const handleErrorMiddleware = require('./middlewares/handleErrorMiddleware');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);
app.use(handleErrorMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
