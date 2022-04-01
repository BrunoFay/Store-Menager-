const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsServices');
const productsControler = require('../../../controllers/productsControllers');


describe('productsControllers', () => {
  let request = {}, response = {}, next = {};
  describe('verifica o funcionamento da função getAllProducts', () => {
    describe('quando o service retorna um array vazio', () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      })
      it('retorna um status 200', async () => {
        await productsControler.getAllProducts(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um json vazio', async () => {
        await productsControler.getAllProducts(request, response, next);
        expect(response.json.calledWith([])).to.be.equal(true);
      })
    })
    describe('quando o service retorna um array com os produtos', () => {
      const productsMocked = [{
        id: 1,
        name: 'Produto 1',
        quantity: 10
      }, {
        id: 2,
        name: 'Produto 2',
        quantity: 20
      }]

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      })
      it('retorna um status 200', async () => {
        await productsControler.getAllProducts(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um json com os produtos', async () => {
        await productsControler.getAllProducts(request, response, next);
        expect(response.json.calledWith(productsMocked)).to.be.equal(true);
      })
    })
    describe('quando o service retorna um erro', () => {
      const errorMocked = {
        status: 500,
        error: 'Erro interno no servidor'
      }
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
      })
      it('retorna um status 500', async () => {
        await productsControler.getAllProducts(request, response, next);
        expect(response.status.calledWith(500)).to.be.equal(true);
      })
      it('retorna um json com o erro', async () => {
        await productsControler.getAllProducts(request, response, next);
        expect(response.json.calledWith(errorMocked)).to.be.equal(true);
      })
    })
  })

  describe('verifica o funcionamento da função getProductsById', () => {
    describe('quando o service retorna um array vazio', () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      })
      it('retorna um status 200', async () => {
        await productsControler.getProductsById(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um json vazio', async () => {
        await productsControler.getProductsById(request, response, next);
        expect(response.json.calledWith({})).to.be.equal(true);
      })
    })
    describe('quando o service retorna um array com os produtos', () => {
      const productsMocked = [{
        id: 1,
        name: 'Produto 1',
        quantity: 10
      }]

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProductsById').returns(productsMocked);
      })
      after(() => {
        productsService.getProductsById.restore();
      })
      it('retorna um status 200', async () => {
        await productsControler.getProductsById(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um json com os produtos', async () => {
        await productsControler.getProductsById(request, response, next);
        expect(response.json.calledWith(productsMocked)).to.be.equal(true);
      })
    })
  })
  describe('verifica o funcionamento da função createProduct', () => {
    describe('verifica se retorna um objeto', () => {
      const productMocked = {
        id: 1,
        name: 'Produto 1',
        quantity: 10
      }
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'createProduct').returns(productMocked);
      })
      after(() => {
        productsService.createProduct.restore();
      })
      it('retorna um status 200', async () => {
        await productsControler.createProduct(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um json com o produto', async () => {
        await productsControler.createProduct(request, response, next);
        expect(response.json.calledWith(productMocked)).to.be.equal(true);
      })
    })
    describe('quando o service retorna um erro', () => {
      const productMocked = {
        id: 1,
        name: 'Produto 1',
        quantity: 10
      }
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'createProduct').returns(productMocked);
      })
      after(() => {
        productsService.createProduct.restore();
      })
      it('retorna um status 409', async () => {
        request.body.name = 'Produto 1';
        await productsControler.createProduct(request, response, next);
        expect(response.status.calledWith(409)).to.be.equal(true);
      })
      it('retorna uma mensagem de erro "Product already exists"', () => {
        request.body.name = 'Produto 1';
        productsControler.createProduct(request, response, next);
        expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
      })

    })
  })
  describe('verifica o funcionamento da função updateProduct', () => {
    describe('verifica se retorna um objeto', async () => {
      const productMocked = {
        id: 1,
        name: 'Produto 1',
        quantity: 10
      }
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'updateProduct').returns(productMocked);
      })
      after(() => {
        productsService.updateProduct.restore();
      })
      it('retorna um status 200', async () => {
        await productsControler.updateProduct(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um json com o produto', async () => {
        await productsControler.updateProduct(request, response, next);
        expect(response.json.calledWith(productMocked)).to.be.equal(true);
      })
    })
    describe('quando o service retorna um erro', () => {
      const productMocked = {
        id: 1,
        name: 'Produto 1',
        quantity: 10
      }
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'updateProduct').returns(productMocked);
      })
      after(() => {
        productsService.updateProduct.restore();
      })
      it('retorna um status 404', async () => {
        request.params.id = 3212;
        await productsControler.updateProduct(request, response, next);
        expect(response.status.calledWith(409)).to.be.equal(true);
      })
      it('retorna uma mensagem de erro "Product already exists"', () => {
        request.params.id = 3212;
        productsControler.updateProduct(request, response, next);
        expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
      })
    })
  })
  describe('verifica o funcionamento da função removeProduct', () => {
    describe('retorna status 204', async () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'removeProduct').returns();
      })
      after(() => {
        productsService.removeProduct.restore();
      })
      it('retorna um status 204', async () => {
        await productsControler.removeProduct(request, response, next);
        expect(response.status.calledWith(204)).to.be.equal(true);
      })
      it('não retorna corpo na requisição', async () => {
        await productsControler.removeProduct(request, response, next);
        expect(response.json.calledWith()).to.be.equal(false);
      })
    })
    describe('quando service retorna um erro', () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'removeProduct').returns();
      })
      after(() => {
        productsService.removeProduct.restore();
      })
      it('retorna um status 404', async () => {
        request.params.id = 222;
        await productsControler.removeProduct(request, response, next);
        expect(response.status.calledWith(404)).to.be.equal(true);
      })
      it('retorna uma mensagem de erro "Product not found"', async() => {
        request.params.id = 222;
       await productsControler.removeProduct(request, response, next);
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      })
    })
  })

})