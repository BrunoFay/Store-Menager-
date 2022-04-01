const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');

describe('verifica comportamentos da rota sales na camada de serviço', () => {
  describe('verifica caso nao retorne produto na função getAllSales', async () => {
    before(async () => {
      const mock = []
      sinon.stub(salesModel, 'getAllSales').resolves(mock)
    });

    after(() => salesModel.getAllSales.restore());

    it('retorna um array', async () => {
      const response = await salesServices.getAllSales();
      expect(response).to.be.an('array');
    })

    it('retorna um array vazio', async () => {
      const response = await salesServices.getAllSales();
      expect(response).to.be.empty;
    })
  })

  describe('verifica caso tenha produtos no banco de dados', async () => {
    const mock = [
      {
        saleId: 3,
        date: "2022-03-31T23:15:49.000Z",
        productId: 3,
        quantity: 14
      }
    ]
    before(async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(mock);
    })

    after(async () => {
      salesModel.getAllSales.restore();
    })

    it('retorna um array', async () => {
      const response = await salesServices.getAllSales();
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await salesServices.getAllSales();
      expect(response).to.be.not.empty;
    })

    it("retorna um array com as chaves saleId, date, productId, quantity", async () => {
      const [response] = await salesServices.getAllSales();
      expect(response).to.have.keys(['saleId', 'date', 'productId', 'quantity']);
    })
  })
})

describe('verifica comportamentos da função getSalesById', () => {
  describe('verifica se ao passar um id valido,não retorna um array vazio', async () => {
    const mockId = 3
    const mock = [
      {
        date: "2022-03-31T23:15:49.000Z",
        productId: 3,
        quantity: 14
      }
    ]
    before(async () => {
      sinon.stub(salesModel, 'getSalesById').resolves(mock)
    });

    after(async () => {
      salesModel.getSalesById.restore();
    });

    it('retorna um array', async () => {
      const response = await salesServices.getSalesById(mockId);
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await salesServices.getSalesById(mockId);
      expect(response).to.be.not.empty;
    })

    it("retorna um array com as chaves  date, productId, quantity", async () => {
      const [response] = await salesServices.getSalesById();
      expect(response).to.have.keys(['date', 'productId', 'quantity']);
    })
  })

  describe("verifica caso o id passado nao exista, receba a mensagem 'Sale not found'", async () => {
    const mockId = 2
    const mock = [
      {
        saleId: 3,
        date: "2022-03-31T23:15:49.000Z",
        productId: 3,
        quantity: 14
      }]
    const messageResponseMocked = { error: { message: 'Sale not found' }, status: 404 }
    before(async () => {
      sinon.stub(salesModel, 'getSalesById').resolves(mock);
    })

    after(async () => {
      salesModel.getSalesById.restore();
    })

    it('retorna um objeto', async () => {
      const response = await salesServices.getSalesById(mockId);
      expect(response).to.be.an('object');
    })

    it('retorna uma mensagem de erro', async () => {
      const response = await salesServices.getSalesById(mockId);
      expect(response).to.deep.equal(messageResponseMocked);
    })
  })

})

describe('verifica comportamentos na função createSale', () => {
  describe('verifica se recebe um objeto ao cadastrar uma nova venda', async () => {
    const mockId = 2
    const mockSaleModel = [
      {
        saleId: 1,
        date: "2022-03-31T22:52:56.000Z",
        productId: 1,
        quantity: 5
      }]
    const mockSaleCreted = {
      id: 2,
      itemsSold: [
        {
          productId: 1,
          quantity: 3
        }
      ]
    }
    const newSaleMocked =  [
      { id:mockId,
        productId: 1,
        quantity: 3
      }
    ]
    before(async () => {
      sinon.stub(salesModel, 'createRegisterInTableSales').resolves(mockId);
      sinon.stub(salesModel, 'createSale').resolves(mockSaleModel)
    });

    after(async () => {
      salesModel.createRegisterInTableSales.restore();
      salesModel.createSale.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesServices.createSale(newSaleMocked);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves id e itemsSold ', async () => {
      const response = await salesServices.createSale(newSaleMocked);
      expect(response).to.have.keys(['id', 'itemsSold']);
    })
    it('retorna um objeto com o formato certo ', async () => {
      const response = await salesServices.createSale(newSaleMocked);
      expect(response).to.deep.equal(mockSaleCreted);
    })
  })

})

describe('verifica comportamentos da função updateSale', () => {
  describe('verifica se retorna o objeto com os dados do produto editado ', async () => {
    const mockId = 5
    const mockSaleModel = [
      {
        saleId: 5,
        date: "2022-03-31T22:52:56.000Z",
        productId: 1,
        quantity: 5
      }]

    const editedSaleMocked =  [
      {
        productId: 1,
        quantity: 6
      }
    ]
    const mockedResponse = {
      saleId: mockId,
      itemUpdated: [
        {
          productId: 1,
          quantity: 6
        }
      ]
    }
    before(async () => {
      sinon.stub(salesModel, 'updateSale').resolves(mockSaleModel)
    });

    after(async () => {
      salesModel.updateSale.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesServices.updateSale(editedSaleMocked, mockId);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves saleId e itemUpdated', async () => {
      const response = await salesServices.updateSale(editedSaleMocked, mockId);
      expect(response).to.have.keys(['saleId', 'itemUpdated']);
    })
    it('retorna o objeto correto', async () => {
      const [response] = await salesServices.updateSale(editedSaleMocked, mockId);
      expect(response).to.deep.equal(mockedResponse);
    })
  })
})

describe('verifica comportamentos na rota DELETE /products/:id', () => {
  describe('verifica se retorna a mensagem de erro caso nao exista o id passado como parametro ', async () => {
    const mockId = 55
    const productsDbMocked = [{
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]
    const messageResponseMocked = { error: { message: 'Product not found' }, status: 404 }

    before(async () => {
      sinon.stub(salesModel, 'removeProduct').resolves(productsDbMocked)
    });

    after(async () => {
      salesModel.removeProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesServices.removeProduct(mockId);
      expect(response).to.be.an('object');
    })

    it("retorna o objeto com a mensagem 'Product not found'", async () => {
      const response = await salesServices.removeProduct(mockId);
      expect(response).to.deep.equal(messageResponseMocked);
    })
  })
})