const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

 describe('verifica comportamentos produtos na camada model', () => {
  describe('verifica caso nao tenha produtos no banco de dados',  () => {
    before(async () => {
      const mock = [[], [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.an('array');
    })

    it('retorna um array vazio', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.empty;
    })
  })

  describe('verifica caso tenha produtos no banco de dados',  () => {
    const productsMocked = [{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    }]

    before(async () => {
      const mock = [productsMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.not.empty;
    })

    it('retorna um array com as chaves id,name,quantity', async () => {
      const [response] = await productsModel.getAllProducts();
      expect(response).to.have.keys(['id', 'name', 'quantity']);
    })
  })
})

describe('verifica comportamentos na rota GET /products/:id', () => {
  const mockId = 1;
  describe('verifica se o produto com id no banco de dados é retornado corretamente',  () => {
    const productsDbMocked = []
    before(async () => {
      const mock = [productsDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productsModel.getProductsById(mockId);
      expect(response).to.be.an('array');
    })

    it('retorna um array vazio', async () => {
      const response = await productsModel.getProductsById(mockId);
      expect(response).to.be.empty;
    })
  })

  describe('verifica caso tenha produto com o id no banco de dados',  () => {
    const productsDbMocked = [{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    }]
    before(async () => {
      const mock = [productsDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const response = await productsModel.getProductsById(mockId);
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await productsModel.getProductsById(mockId);
      expect(response).to.be.not.empty;
    })

    it('retorna um array com as chaves id,name,quantity', async () => {
      const response = await productsModel.getProductsById(mockId);
      expect(response[0]).to.have.keys('id', 'name', 'quantity');
    })
  })

})

describe('verifica comportamentos da função getAllByNames', () => {
  const mockName = "Martelo";
  describe('verifica se retorna um array vazio quando o nome nao existe no banco de daods', async () => {
    const productsDbMocked = []
    before(async () => {
      const mock = [productsDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productsModel.getProductsByName(mockName);
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await productsModel.getProductsByName(mockName);
      expect(response).to.be.empty;
    })
  })

  describe('verifica caso tenha produto com o nome no banco de dados', async () => {
    const productsDbMocked = [{
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]
    before(async () => {
      const mock = [productsDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const response = await productsModel.getProductsByName(mockName);
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await productsModel.getProductsByName(mockName);
      expect(response).to.be.not.empty;
    })

    it('retorna um array com as chaves id,name,quantity', async () => {
      const response = await productsModel.getProductsByName(mockName);
      expect(response[0]).to.have.keys(['id', 'name', 'quantity']);
    })
  })

})

describe('verifica comportamentos na rota POST /products', () => {
  describe('verifica se adiciona o produto no banco de dados',  () => {
    const productsDbMocked = [{
      id: 12,
      name: "Martelo de Thor",
      quantity: 10
    }]

    const newProductMocked = {
      name: "Martelo de Thor",
      quantity: 10
    }
    before(async () => {
      const mock = [productsDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsModel.createProduct(newProductMocked);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves id,name,quantity', async () => {
      const response = await productsModel.createProduct(newProductMocked);
      expect(response).to.have.keys('id', 'name', 'quantity');
    }) 
  })
})


describe('verifica comportamentos na rota PUT /products/:id', () => {
  describe('verifica se retorna o valor do produto alterado no banco de dados ',  () => {
    const mockId = 5
    const productsDbMocked = [{
      id: 5,
      name: "Martelo de Thor",
      quantity: 10
    }]

    const editedProductMocked = {
      name: "Martelo de Thor",
      quantity: 10
    }
    before(async () => {
      const mock = [productsDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsModel.updateProduct(editedProductMocked, mockId);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves id,name,quantity', async () => {
      const response = await productsModel.updateProduct(editedProductMocked, mockId);
      expect(response).to.have.keys(['id', 'name', 'quantity']);
    })
  })
})

describe('verifica comportamentos na rota DELETE /products/:id', () => {
  describe('verifica se retorna a mensagem do produto removido do banco de dados ',  () => {
    const mockId = 5
    const productsDbMocked ={ message: 'Product removed' }

    before(async () => {
      const mock = [productsDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsModel.removeProduct(mockId);
      expect(response).to.be.an('object');
    })

    it("retorna o objeto com a mensagem 'Product removed'", async () => {
      const response = await productsModel.removeProduct(mockId);
      expect(response).to.deep.equal(productsDbMocked);
    })
  }) 
})