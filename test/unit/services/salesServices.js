const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');

describe('verifica caso nao retorne produto na função getAllSales', () => {
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

describe('verifica caso tenha produtos no banco de dados', () => {
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

describe('verifica comportamentos da função getSalesById', () => {
  describe('verifica se ao passar um id valido,não retorna um array vazio', () => {
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
    const mock = []
    const messageResponseMocked = { error: { message: 'Sale not found' }, status: 404 }
    before(async () => {
      next = sinon.stub()
      sinon.stub(salesModel, 'getSalesById').resolves(mock);
    })

    after(async () => {
      salesModel.getSalesById.restore();
    })

    it('retorna um objeto contendo uma mensagem de erro e seu status ', async () => {
      const response = await salesServices.getSalesById(mockId);
      expect(response).to.be.deep.equal(messageResponseMocked);
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
        quantity: 3
      }]
    const newSaleMocked = [
      {
        id: mockId,
        productId: 1,
        quantity: 32
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

    it('retorna um numero id da função createRegisterInTableSales', async () => {
      const response = await salesServices.createSale(newSaleMocked);
      expect(response.id).to.be.a('number');
    })
    it('retorna um objeto', async () => {
      const response = await salesServices.createSale(newSaleMocked);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves id e itemsSold ', async () => {
      const response = await salesServices.createSale(newSaleMocked);
      expect(response).to.have.keys(['id', 'itemsSold']);
    })

  })

})

/* describe('verifica comportamentos da função updateSale', () => {
  describe('verifica se retorna o objeto com os dados do produto editado ', async () => {
    const mockId = 5
    const mockSaleModel = [
      {
        saleId: 5,
        date: "2022-03-31T22:52:56.000Z",
        productId: 1,
        quantity: 5
      }]

    const editedSaleMocked = [
      {
        productId: 1,
        quantity: 6
      }
    ]

    before( () => {
      sinon.stub(salesModel, 'updateSale').resolves(mockSaleModel)
    });

    after( () => {
      salesModel.updateSale.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesServices.updateSale(mockId, editedSaleMocked);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves saleId e itemUpdated', async () => {
      const response = await salesServices.updateSale(mockId, editedSaleMocked);
      expect(response).to.have.keys(['saleId', 'itemUpdated']);
    })

  })
})
 */