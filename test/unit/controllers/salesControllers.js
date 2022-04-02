const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesServices');
const salesControler = require('../../../controllers/salesControllers');


describe('salesControllers', () => {
  let response = {}, request = {}, next = {};
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

  describe('verifica o funcionamento da função getSalesById', () => {
    describe('quando o service retorna um objeto com o produto', () => {
      let request = {}, response = {}, next = {};
      const salesMocked = {
        saleId: 1,
        date: "2022-03-31T22:52:56.000Z",
        productId: 1,
        quantity: 5
      }
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSalesById').resolves(salesMocked);
      })
      after(async () => {
        salesService.getSalesById.restore();
      })
      it('retorna um status 200', async () => {
        request = {
          params: {
            id: 1
          }
        }
        await salesControler.getSalesById(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um objeto com o produto', async () => {
        await salesControler.getSalesById(request, response, next);
        expect(response.json.calledWith(salesMocked)).to.be.equal(true);
      })
    })
    describe('quando o service retorna um objeto vazio', () => {
      let request = {}, response = {}, next = {};
      const salesMocked = {
        saleId: 1,
        date: "2022-03-31T22:52:56.000Z",
        productId: 1,
        quantity: 5
      }
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSalesById').resolves(salesMocked);
      })
      after(async () => {
        salesService.getSalesById.restore();
      })
      it('retorna um status 200', async () => {
        request = {
          params: {
            id: 1
          }
        }
        await salesControler.getSalesById(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
    })
  })



  describe('verifica o funcionamento da função createSale', () => {
    describe('quando o service retorna um objeto com o produto', () => {
      let request = {}, response = {}, next = {};
      const salesMocked = {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 3
          }
        ]
      }
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'createSale').resolves(salesMocked);
      })
      after(async () => {
        salesService.createSale.restore();
      })
      it('retorna um status 201', async () => {
        request = {
          body: {
            productId: 1,
            quantity: 5
          }
        }
        await salesControler.createSale(request, response, next);
        expect(response.status.calledWith(201)).to.be.equal(true);
      })
      it('retorna um objeto com o produto', async () => {
        await salesControler.createSale(request, response, next);
        expect(response.json.calledWith(salesMocked)).to.be.equal(true);
      })
    })

  })


  describe('verifica o funcionamento da função updateSale', () => {
    describe('quando o service retorna um objeto com o produto', () => {
      let request = {}, response = {}, next = {};
      const salesMocked = {
        saleId: 1,
        itemUpdated: [
          {
            productId: 1,
            quantity: 6
          }
        ]
      }
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'updateSale').resolves(salesMocked);
      })
      after(async () => {
        salesService.updateSale.restore();
      })
      it('retorna um status 200', async () => {
        request = {
          params: {
            id: 1
          },
          body: {
            productId: 1,
            quantity: 5
          }
        }
        await salesControler.updateSale(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um objeto com o produto', async () => {
        await salesControler.updateSale(request, response, next);
        expect(response.json.calledWith(salesMocked)).to.be.equal(true);
      })
    })

  })
})