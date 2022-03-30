const express = require('express');
const productRouter = express.Router();


productRouter.get('/', (req, res) => {
  res.status(200).json(recipes);
}).post((req, res) => {
  res.status(201).json(req.body);
});

productRouter.get('/:id', (req, res) => {

}).put((req, res) => {

}).delete((req, res) => {

})

module.exports = productRouter;