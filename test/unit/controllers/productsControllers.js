const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsServices');
const productsControler = require('../../../controllers/productsControllers');
const middlewares = require('../../../middlewares/validateProductsMiddleware');

describe('verifica o funcionamento da função getAllProducts', () => {
  describe('quando o service retorna um array com os produtos', () => {
    let request = {}, response = {};
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
      sinon.stub(productsService, 'getAllProducts').returns(productsMocked);
    })
    after(() => {
      productsService.getAllProducts.restore();
    })
    it('retorna um status 200', async () => {
      await productsControler.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
    it('retorna um json com os produtos', async () => {
      await productsControler.getAllProducts(request, response);
      expect(response.json.calledWith(productsMocked)).to.be.equal(true);
    })
  })
})
describe('verifica o funcionamento da função getProductsById', () => {
  describe('quando o service retorna um objeto com o produto', () => {
    let request = {}, response = {}, next = {};
    const productsMocked = {
      id: 1,
      name: 'Produto 1',
      quantity: 10
    }
    before(async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductsById').resolves(productsMocked);
    })
    after(async () => {
      productsService.getProductsById.restore();
    })
    it('retorna um status 200', async () => {
      request = {
        params: {
          id: 1
        }
      }
      await productsControler.getProductsById(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
    it('retorna um json com os produtos', async () => {
      request = {
        params: {
          id: 1
        }
      }
      await productsControler.getProductsById(request, response, next);
      expect(response.json.calledWith(productsMocked)).to.be.equal(true);
    })
  })
  describe('retorna um erro quando o id não existe', () => {
    let request = {}, response = {}, next = {};
    const mensagemock = Error('Product not found')
    before(async () => {
      next = sinon.stub()
      sinon.stub(productsService, 'getProductsById').throws(mensagemock);
    })
    after(async () => {
      productsService.getProductsById.restore();
    })
    it('retorna um json com o erro', async () => {
      request = {
        params: {
          id: 122
        }
      }
      await productsControler.getProductsById(request, response, next);
      expect(next.calledWith(sinon.match(mensagemock))).to.be.equal(true);
    })
  })
})


describe('verifica o funcionamento da função createProduct', () => {
  describe('verifica se retorna um objeto', () => {
    let request = {}, response = {}, next = {};
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
    it('retorna um status 201', async () => {
      request.body = { name: 'Produto 1', quantity: 10 };
      await productsControler.createProduct(request, response, next);
      expect(response.status.calledWith(201)).to.be.equal(true);
    })
    it('retorna um json com o produto', async () => {
      request.body = { name: 'Produto 1', quantity: 10 };
      await productsControler.createProduct(request, response, next);
      expect(response.json.calledWith(productMocked)).to.be.equal(true);
    })
  })

  describe('quando o service retorna um erro caso o nome do novo produto já exista', () => {
    let request = {}, response = {}, next = {};
    const mensagemock = Error("Product already exists")
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').throws(mensagemock);
    })
    after(() => {
      productsService.createProduct.restore();
    })

    it('retorna uma mensagem de erro "Product already exists"', () => {
      request.body = { name: 'Produto 1', quantity: 10 };
      productsControler.createProduct(request, response, next);
      expect(next.calledWith(sinon.match(mensagemock))).to.be.equal(true);
    })

  })
})


describe('verifica o funcionamento da função updateProduct', () => {
  describe('verifica se retorna um objeto', () => {
    let request = {}, response = {}, next = {};
    const productMocked = {
      id: 1,
      name: 'Produto 1',
      quantity: 10
    }
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct').returns(productMocked);
    })
    after(() => {
      productsService.updateProduct.restore();
    })
    it('retorna um status 200', async () => {
      request = {
        params: {
          id: 1
        },
        body: { name: 'Produto 1', quantity: 10 }
      };
      await productsControler.updateProduct(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
    it('retorna um json com o produto', async () => {
      request = {
        params: {
          id: 1
        },
        body: { name: 'Produto 1', quantity: 10 }
      };
      await productsControler.updateProduct(request, response);
      expect(response.json.calledWith(productMocked)).to.be.equal(true);
    })
  })

  
  
  describe('verifica o funcionamento da função removeProduct', () => {
  describe('retorna status 204', async () => {
    let request = {}, response = {}, next = {};
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'removeProduct').returns();
    })
    after(() => {
      productsService.removeProduct.restore();
    })
    it('retorna um status 204', async () => {
      request = {
        params: {
          id: 1
        }
      };
      await productsControler.removeProduct(request, response, next);
      expect(response.status.calledWith(204)).to.be.equal(true);
    })
    it('não retorna corpo na requisição', async () => {
      request = {
        params: {
          id: 1
        }
      };
      await productsControler.removeProduct(request, response, next);
      expect(response.json.calledWith()).to.be.equal(false);
    })
  })
  })
})