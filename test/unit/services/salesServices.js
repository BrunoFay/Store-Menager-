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
/*  describe.only('verifica comportamentos na função createSale', () => {
  describe('verifica se recebe um objeto com erro ao tentar cadastrar uma venta com o valor de produtos nao disponivel', async () => {
    const mockId = 2
      const mockedMessage = { message: 'Such amount is not permitted to sell' }
    const newSaleMocked = [
      {
        productId: 1,
        quantity: 32
      }
    ]
    before(async () => {
      sinon.stub(salesModel, 'createRegisterInTableSales').resolves(mockId);
      sinon.stub(salesModel, 'checkQuantityOfProducts').resolves([]);
      sinon.stub(salesModel, 'createSale').resolves([])
    });

    after(async () => {
      salesModel.createRegisterInTableSales.restore();
      salesModel.checkQuantityOfProducts.restore();
      salesModel.createSale.restore();

    });

  
    it('retorna um objeto', async () => {
      const response = await salesServices.createSale(newSaleMocked);
      expect(response).to.be.an('object');
    })

    it("retorna um objeto com  a mensagem de erro 'Such amount is not permitted to sell' ", async () => {
      const response = await salesServices.createSale(newSaleMocked);
      expect(response.error).to.be.deep.equal(mockedMessage);
    })
    
  })
  
})
  */
  describe('verifica comportamento da função deleteSale',()=>{
  describe('verifica se ao passar um id invalido, retorna uma mensagem de erro', () => {
    const mockId = 3
    const mock = [
      {
        date: "2022-03-31T23:15:49.000Z",
        productId: 3,
        quantity: 14
      }
    ]
    const mockedMessage =  { message: 'Sale not found' }
    before(async () => {
      sinon.stub(salesModel, 'deleteSale').resolves(mock)
      sinon.stub(salesModel,'getSalesById').resolves([])

    });

    after(async () => {
      salesModel.deleteSale.restore();
      salesModel.getSalesById.restore();

    });

    it('retorna um objeto', async () => {
      const response = await salesServices.deleteSale(mockId);
      expect(response).to.be.an('object');
    })

    it("retorna um objeto com  a mensagem de erro 'Sale not found' ", async () => {
      const response = await salesServices.deleteSale(mockId);
      expect(response.error).to.be.deep.equal(mockedMessage);
    })

  })
}) 
   describe('verifica comportamentos da função updateSale', () => {
  describe('verifica se retorna o objeto com erro ao passar um id invalido ', async () => {
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
    const mockedMessage = { message: 'Sale not found' }
    before(async () => {
      sinon.stub(salesModel, 'updateSale').resolves(mockSaleModel)
      sinon.stub(salesModel,'getSalesById').resolves([])

    });

    after( async() => {
      salesModel.updateSale.restore();
      salesModel.getSalesById.restore();

    });

    it('retorna um objeto', async () => {
      const response = await salesServices.updateSale(mockId, editedSaleMocked);
      expect(response).to.be.an('object');
    })

    it("retorna um objeto com a mensagem 'Sale not found'", async () => {
      const response = await salesServices.updateSale(mockId, editedSaleMocked);
      expect(response.error).to.be.deep.equal(mockedMessage);
    })

  })
}) 
 