const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesServices');
const salesControler = require('../../../controllers/salesControllers');


describe('salesControllers', () => {
  describe('verifica o funcionamento da função getAllSales', () => {
    describe('retorna um array com sales', () => {
      const salesMocked = [{
        saleId: 1,
        date: "2022-03-31T22:52:56.000Z",
        productId: 1,
        quantity: 5
      },]
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getAllSales').resolves(salesMocked);
      })
      after(() => {
        salesService.getAllSales.restore();
      })

      it('retorna um status 200', async () => {
        await salesControler.getAllSales(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um array com sales', async () => {
        await salesControler.getAllSales(request, response, next);
        expect(response.json.calledWith(salesMocked)).to.be.equal(true);

      })
      it('sales tem as chaves saleId, date, productId, quantity', async () => {
        await salesControler.getAllSales(request, response, next);
        expect(response.json.calledWith(salesMocked)).to.be.equal(true);
        expect(response.json.calledWith(salesMocked[0])).to.be.equal(true);
        expect(response.json.calledWith(salesMocked[0].saleId)).to.be.equal(true);
        expect(response.json.calledWith(salesMocked[0].date)).to.be.equal(true);
        expect(response.json.calledWith(salesMocked[0].productId)).to.be.equal(true);
        expect(response.json.calledWith(salesMocked[0].quantity)).to.be.equal(true);
      })
    
    })
    describe('retorna um array vazio', () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getAllSales').resolves([]);
      })
      after(() => {
        salesService.getAllSales.restore();
      })
      it('retorna um status 200', async () => {
        await salesControler.getAllSales(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um array vazio', async () => {
        await salesControler.getAllSales(request, response, next);
        expect(response.json.calledWith([])).to.be.equal(true);
      })
    })
  })
})
