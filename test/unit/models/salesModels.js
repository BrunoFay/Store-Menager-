const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModels');



describe('verifica caso nao tenha sales no banco de dados',  () => {

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

describe('verifica caso tenha sales no banco de dados',  () => {
  const salesMocked = [
    {
      saleId: 1,
      date: "2022-03-31T22:52:56.000Z",
      productId: 3,
      quantity: 15
    },
  ]

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

  it('retorna um array com as chaves saleId date,name,quantity', async () => {
    const response = await salesModel.getAllSales();
   ;
    expect(response[0]).to.have.keys('date','saleId', 'productId', 'quantity');
  })
})



describe('verifica comportamentos na rota GET /sales/:id', () => {
  const mockId = 1;
  describe('verifica se retorna um array vazio do banco de dados caso o id passado nao exista',  () => {
    const salesMocked = []
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

  describe('verifica caso tenha venda com o id no banco de dados',  () => {
    const salesMocked = [[
      {
        date: "2022-03-31T22:52:56.000Z",
        productId: 3,
        quantity: 15
      }
    ]]
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
  })

})

describe('verifica comportamentos na rota POST /sales', () => {
  describe('verifica se adiciona o venda no banco de dados',() => {
    const salesMocked = []

    const newSaleMocked = {
      productId: 3,
      quantity: 14
    }
    before(async () => {
      const mock = [salesMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('verifica se não retorna nada', async () => {
     const response= await salesModel.createSale(newSaleMocked);
      expect(response).to.be.undefined;
    })

})
})
describe('verifica comportamentos na rota PUT /sales/:id', () => {
  describe('verifica se retorna o valor do venda alterado no banco de dados ', async () => {
    const mockId = 5
    const salesDbMocked = []

    const editedsaleMocked = [
      {
        id:mockId,
        productId: 3,
        quantity: 14
      }
    ]
  
    before(async () => {
      const mock = [salesDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('verifica se não retorna nada', async () => {
      const response= await salesModel.updateSale(editedsaleMocked);
       expect(response).to.be.undefined;
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

     it('verifica se não retorna nada ', async () => {
      const response = await salesModel.updateSale(editedsaleMocked);
      expect(response).to.be.undefined;
    })
 
  })
})

