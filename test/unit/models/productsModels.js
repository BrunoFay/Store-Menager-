const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

describe('verifica comportamentos na rota GET /products', () => {
  describe('verifica caso nao tenha produtos no banco de dados', async () => {

    before(async () => {
      const mock = [[], [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
    })

    it('retorna um array vazio', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.empty;
    })
  })

  describe('verifica caso tenha produtos no banco de dados', async () => {
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
  describe('verifica se o produto com id no banco de dados', async () => {
    const productsDbMocked = [{
      id: 12,
      name: "Martelo de Thor",
      quantity: 10
    }, {
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]
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

  describe('verifica caso tenha produto com o id no banco de dados', async () => {
    const productsDbMocked = [{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    }, {
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]
    const productMocked = [{
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
      const response = await productsModel.getProductsById(mockId);
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await productsModel.getProductsById(mockId);
      expect(response).to.be.not.empty;
    })

    it('retorna um array com as chaves id,name,quantity', async () => {
      const [response] = await productsModel.getProductsById(mockId);
      expect(response).to.have.keys(['id', 'name', 'quantity']);
    })
    it('retorna o array com  id,name,quantity corretos', async () => {
      const [response] = await productsModel.getProductsById(mockId);
      expect(response).to.deep.equal(productMocked);
    })
  })

})


describe('verifica comportamentos da função getAllByNames', () => {
  const mockName = "Martelo";
  describe('verifica se retorna o produto exist no banco de dados pelo nome', async () => {
    const productsDbMocked = [{
      id: 12,
      name: "Martelo de Thor",
      quantity: 10
    }, {
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]
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

    it('retorna um array vazio', async () => {
      const response = await productsModel.getProductsByName(mockName);
      expect(response).to.be.empty;
    })
  })

  describe('verifica caso tenha produto com o id no banco de dados', async () => {
    const productsDbMocked = [{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    }, {
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]
    const productMocked = [{
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
      const [response] = await productsModel.getProductsByName(mockName);
      expect(response).to.have.keys(['id', 'name', 'quantity']);
    })
    it('retorna o array com  id,name,quantity corretos', async () => {
      const [response] = await productsModel.getProductsByName(mockName);
      expect(response).to.deep.equal(productMocked);
    })
  })

})


describe('verifica comportamentos na rota POST /products', () => {
  describe('verifica se adiciona o produto no banco de dados', async () => {
    const productsDbMocked = [{
      id: 12,
      name: "Martelo de Thor",
      quantity: 10
    }, {
      id: 5,
      name: "Martelo",
      quantity: 1000
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
      const [response] = await productsModel.createProduct(newProductMocked);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves id,name,quantity', async () => {
      const [response] = await productsModel.createProduct(newProductMocked);
      expect(response).to.have.keys(['id', 'name', 'quantity']);
    })
    it('retorna o objeto correto', async () => {
      const [response] = await productsModel.createProduct(newProductMocked);
      expect(response).to.deep.equal({ id: 5, name: 12, quantity: 2019 });
    })
  })
})


describe('verifica comportamentos na rota PUT /products/:id', () => {
  describe('verifica se retorna o valor do produto alterado no banco de dados ', async () => {
    const mockId = 5
    const productsDbMocked = [{
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]

    const editedProductMocked = {
      name: "Martelo de Thor",
      quantity: 10
    }
    const mockedResponse ={ id: mockId, ...editedProductMocked }
    before(async () => {
      const mock = [productsDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const [response] = await productsModel.updateProduct(editedProductMocked, mockId);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves id,name,quantity', async () => {
      const [response] = await productsModel.updateProduct(editedProductMocked, mockId);
      expect(response).to.have.keys(['id', 'name', 'quantity']);
    })
    it('retorna o objeto correto', async () => {
      const [response] = await productsModel.updateProduct(editedProductMocked, mockId);
      expect(response).to.deep.equal(mockedResponse);
    })
  })
})



describe('verifica comportamentos na rota DELETE /products/:id', () => {
  describe('verifica se retorna a mensagem do produto removido do banco de dados ', async () => {
    const mockId = 5
    const productsDbMocked = [{
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]
    const mockedMessage = { message: 'Product removed' }
    
    before(async () => {
      const mock = [productsDbMocked, [{}, {}]]
      sinon.stub(connection, 'execute').resolves(mock)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const [response] = await productsModel.removeProduct(mockId);
      expect(response).to.be.an('object');
    })

    it("retorna o objeto com a mensagem 'Product removed'", async () => {
      const [response] = await productsModel.removeProduct(mockId);
      expect(response).to.deep.equal(mockedMessage);
    })
  })
})