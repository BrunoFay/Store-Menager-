const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsServices');
const productsControler = require('../../../controllers/productsControllers');


/* describe('productsControllers', () => {

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
      let request = {}, response = {};
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
        request.params.id = 1;
        await productsControler.getProductsById(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um json com os produtos', async () => {
        request.params.id = 1;
        await productsControler.getProductsById(request, response, next);
        expect(response.json.calledWith(productsMocked)).to.be.equal(true);
      })
    })
    describe('retorna um erro quando o id não existe', () => {
      let request = {}, response = {}, next = {};
      const mensagemock = Error('Product not found')
      before(() => {
        next = sinon.stub()
        sinon.stub(productsService, 'getProductsById').throws(mensagemock);
      })
      after(() => {
        productsService.getProductsById.restore();
      })
      it('retorna um json com o erro', async () => {
        request.params.id = 122;
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
    describe('quando o service retorna um erro caso falte o nome do novo produto', () => {
      let request = {}, response = {}, next = {};
      const mensagemock = Error("\"name\" is required")
      before(() => {
        sinon.stub(productsService, 'createProduct').returns(mensagemock);
      })
      after(() => {
        productsService.createProduct.restore();
        next.restore();
      })
      it('retorna um status 400 se a requisição for feita sem o nome', async () => {
        request.body.quantity = 10;
        await productsControler.createProduct(request, response, next);
        expect(response.status.calledWith(400)).to.be.equal(true);
      })
      it('retorna uma mensagem de erro "Product already exists"', () => {
        request.body.quantity = 10;
        productsControler.createProduct(request, response, next);
        expect(next.calledWith(sinon.match(mensagemock))).to.be.equal(true);
      })

    })
    describe('quando o service retorna um erro caso falte a quantidade do novo produto', () => {
      let request = {}, response = {}, next = {};
      const mensagemock = Error("\"quantity\" is required")

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'createProduct').returns(mensagemock);
        next = sinon.stub();
      })
      after(() => {
        productsService.createProduct.restore();
        next.restore();
      })
      it('retorna um status 400 se a requisição for feita sem a quantidade', async () => {
        request.body.name = 'Produto 1';
        await productsControler.createProduct(request, response, next);
        expect(response.status.calledWith(400)).to.be.equal(true);
      })
      it('retorna uma mensagem de erro "Product already exists"', () => {
        request.body.name = 'Produto 1';
        productsControler.createProduct(request, response, next);
        expect(next.calledWith(sinon.match(mensagemock))).to.be.equal(true);
      })

    })
    describe('quando o service retorna um erro caso o nome do novo produto já exista', () => {
      let request = {}, response = {}, next = {};
      const mensagemock = Error("Product already exists")
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'createProduct').returns(mensagemock);
        next = sinon.stub();
      })
      after(() => {
        productsService.createProduct.restore();
        next.restore();
      })
      it('retorna um status 409 se a requisição for feita com o nome já existente', async () => {
        request.body = { name: 'Produto 1', quantity: 10 };
        await productsControler.createProduct(request, response, next);
        expect(response.status.calledWith(409)).to.be.equal(true);
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
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'updateProduct').returns(productMocked);
      })
      after(() => {
        productsService.updateProduct.restore();
      })
      it('retorna um status 200', async () => {
        request.params.id = 1;
        await productsControler.updateProduct(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      it('retorna um json com o produto', async () => {
        request.params.id = 1;
        await productsControler.updateProduct(request, response, next);
        expect(response.json.calledWith(productMocked)).to.be.equal(true);
      })
    })
    describe('quando o service retorna um erro de produto não encontrado', () => {
      let request = {}, response = {}, next = {};
      const mensagemock = Error('Product not found')
      before(() => {
        next = sinon.stub()
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'updateProduct').returns(mensagemock);
      })
      after(() => {
        productsService.updateProduct.restore();
      })
      it('retorna um status 404', async () => {
        request.params.id = 3212;
        await productsControler.updateProduct(request, response, next);
        expect(response.status.calledWith(404)).to.be.equal(true);
      })
      it('retorna uma mensagem de erro "Product not found"', async () => {
        request.params.id = 3212;
        await productsControler.updateProduct(request, response, next);
        expect(next.calledWith(sinon.match(mensagemock))).to.be.equal(true);
      })
    })
    describe('verifica se retorna um erro ao não passar o nome do produto á ser atualizado', () => {
      let request = {}, response = {}, next = {};
      const mensagemock = Error("\"name\" is required")
     
      before(() => {
        next = sinon.stub()
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'updateProduct').returns(mensagemock);
      })
      after(() => {
        productsService.updateProduct.restore();
      })
      it('retorna um status 400', async () => {
        request.params.id = 1;
        request.body = {
          quantity: 10
        };
        await productsControler.updateProduct(request, response, next);
        expect(response.status.calledWith(400)).to.be.equal(true);
      })
      it('retorna a messagem de erro "\"name\" is required"', () => {
        request.params.id = 1;
        request.body = {
          quantity: 10
        };
        productsControler.updateProduct(request, response, next);
        expect(next.calledWith(sinon.match(mensagemock))).to.be.equal(true);
      })
    })
    describe('verifica se retorna um erro ao não passar a quantidade do produto á ser atualizado', () => {
      let request = {}, response = {}, next = {};
      const mensagemock = Error("\"quantity\" is required")
   
      before(() => {
        next = sinon.stub()
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'updateProduct').returns(mensagemock);
      })
      after(() => {
        productsService.updateProduct.restore();
      })
      it('retorna um status 400', async () => {
        request.params.id = 1;
        request.body = {
          name: 'Produto 1'
        };
        await productsControler.updateProduct(request, response, next);
        expect(response.status.calledWith(400)).to.be.equal(true);
      })
      it('retorna a messagem de erro "\"quantity\" is required"', () => {
        request.params.id = 1;
        request.body = {
          name: 'Produto 1'
        };
        productsControler.updateProduct(request, response, next);
        expect(next.calledWith(sinon.match(mensagemock))).to.be.equal(true);;
      })
    })
  })
  describe('verifica o funcionamento da função removeProduct', () => {
    describe('retorna status 204', async () => {
      let request = {}, response = {}, next = {};
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'removeProduct').returns();
      })
      after(() => {
        productsService.removeProduct.restore();
      })
      it('retorna um status 204', async () => {
        request.params.id = 1;
        await productsControler.removeProduct(request, response, next);
        expect(response.status.calledWith(204)).to.be.equal(true);
      })
      it('não retorna corpo na requisição', async () => {
        request.params.id = 1;
        await productsControler.removeProduct(request, response, next);
        expect(response.json.calledWith()).to.be.equal(false);
      })
    })
    describe('quando service retorna um erro', () => {
      const errorMocked = {
        message: "Product not found"
      }
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'removeProduct').returns(errorMocked);
      })
      after(() => {
        productsService.removeProduct.restore();
      })
      it('retorna um status 404', async () => {
        request.params.id = 222;
        await productsControler.removeProduct(request, response, next);
        expect(response.status.calledWith(404)).to.be.equal(true);
      })
      it('retorna uma mensagem de erro "Product not found"', async () => {
        request.params.id = 222;
        await productsControler.removeProduct(request, response, next);
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      })
    })
  })

}) */