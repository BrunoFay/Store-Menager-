const express = require('express');
const saleRouter = express.Router();

saleRouter.get('/', (req, res) => {
  res.status(200).json(recipes);
}).post((req, res) => {
  res.status(201).json(req.body);
});

saleRouter.get('/:id', (req, res) => {

}).put((req, res) => {

}).delete((req, res) => {

})


module.exports = saleRouter;