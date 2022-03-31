const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModels');

describe('verifica comportamentos na rota GET /sales', () => {
  describe('verifica caso nao tenha vendas no banco de dados', async () => {

    before(async () => {
      const mock = [[], [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.be.an('array');
    })

    it('retorna um array vazio', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.be.empty;
    })
  })

  describe('verifica caso tenha vendas no banco de dados', async () => {
    const salesMocked = [[
      {
        saleId: 1,
        date: "2022-03-31T22:52:56.000Z",
        productId: 3,
        quantity: 15
      },
    ]]

    before(async () => {
      const mock = [salesMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await salesModel.getAllSales();
      expect(response).to.be.not.empty;
    })

    it('retorna um array com as chaves date,name,quantity', async () => {
      const [response] = await salesModel.getAllSales();
      expect(response[0]).to.have.keys(['date', 'name', 'quantity']);
    })
  })
})




describe('verifica comportamentos na rota GET /sales/:id', () => {
  const mockId = 1;
  describe('verifica se retorna um array vazio do banco de dados caso o id passado nao exista', async () => {
    salesMocked = [[]]
    before(async () => {
      const mock = [salesMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await salesModel.getSalesById(mockId);
      expect(response).to.be.an('array');
    })

    it('retorna um array vazio', async () => {
      const response = await salesModel.getSalesById(mockId);
      expect(response).to.be.empty;
    })
  })

  describe('verifica caso tenha venda com o id no banco de dados', async () => {
    const salesMocked = [[
      {
        saleId: 1,
        date: "2022-03-31T22:52:56.000Z",
        productId: 3,
        quantity: 15
      },
      {
        saleId: 2,
        date: "2022-03-31T22:52:56.000Z",
        productId: 2,
        quantity: 1113
      }
    ]]
    const saleResponseMocked=[
      {
        date: "2022-03-31T22:52:56.000Z",
        productId: 3,
        quantity: 15
      }
    ]
    before(async () => {
      const mock = [salesMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const response = await salesModel.getSalesById(mockId);
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await salesModel.getSalesById(mockId);
      expect(response).to.be.not.empty;
    })

    it('retorna um array com as chaves date,productId,quantity', async () => {
      const [response] = await salesModel.getSalesById(mockId);
      expect(response[0]).to.have.keys(['date', 'productId', 'quantity']);
    })
    it('retorna o array com  date,productId,quantity corretos', async () => {
      const [response] = await salesModel.getSalesById(mockId);
      expect(response[0]).to.deep.equal(saleResponseMocked);
    })
  })

})


describe('verifica comportamentos na rota POST /sales', () => {
  describe('verifica se adiciona o venda no banco de dados', async () => {
    const salesMocked = [[
      {
        saleId: 1,
        date: "2022-03-31T22:52:56.000Z",
        productId: 3,
        quantity: 15
      },
      {
        saleId: 2,
        date: "2022-03-31T22:52:56.000Z",
        productId: 2,
        quantity: 1113
      }
    ]]

    const newSaleMocked = {
      productId: 3,
      quantity: 14
    }
    const responseDbMocked ={
      id: 3,
      itemsSold: [
        {
          productId: 3,
          quantity: 14
        }
      ]
    }
    before(async () => {
      const mock = [salesMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const [response] = await salesModel.createSale(newSaleMocked);
      expect(response[0]).to.be.an('object');
    })

    it('retorna um objeto com as chaves id, itemsSold', async () => {
      const [response] = await salesModel.createSale(newSaleMocked);
      expect(response[0]).to.have.keys(['id', 'itemsSold']);
    })
    it('retorna o objeto correto', async () => {
      const [response] = await salesModel.createSale(newSaleMocked);
      expect(response[0]).to.deep.equal(responseDbMocked);
    })
  })
})


describe('verifica comportamentos na rota PUT /sales/:id', () => {
  describe('verifica se retorna o valor do venda alterado no banco de dados ', async () => {
    const mockId = 5
    const salesDbMocked = [[
      {
        saleId: 1,
        date: "2022-03-31T22:52:56.000Z",
        productId: 3,
        quantity: 15
      },
      {
        saleId: 2,
        date: "2022-03-31T22:52:56.000Z",
        productId: 2,
        quantity: 1113
      }
    ]]

    const editedsaleMocked = [
      {
        id:mockId,
        productId: 3,
        quantity: 14
      }
    ]
    const mockedResponse = { id: mockId, ...editedsaleMocked }
    before(async () => {
      const mock = [salesDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const [response] = await salesModel.updateSale(editedsaleMocked);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves saleId,itemUpdated', async () => {
      const [response] = await salesModel.updateSale(editedsaleMocked);
      expect(response).to.have.keys(['saleId', 'itemUpdated']);
    })
    it('retorna o objeto correto', async () => {
      const [response] = await salesModel.updateSale(editedsaleMocked);
      expect(response).to.deep.equal(mockedResponse);
    })
  })
})


describe('verifica o funcionamento da função de cadastrar uma venda', () => {
  describe('verifica se retorna o valor do id da venda que esta sendo cadastrada na rota / POST ', async () => {
    const mockSaleId = 5
    const editedsaleMocked = [
      {
        id:mockSaleId,
        date:'2022-03-31 19:52:56',
      }
    ]
    before(async () => {
      const mock = [editedsaleMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna o id em forma de numero', async () => {
      const [response] = await salesModel.updateSale(editedsaleMocked);
      expect([response][0]).to.be.a('number');
    })

    it('retorna o numero correto', async () => {
      const [response] = await salesModel.updateSale(editedsaleMocked);
      expect(response[0]).to.deep.equal(mockSaleId);
    })
  })
})