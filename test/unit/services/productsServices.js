const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');


describe('verifica caso nao retorne produto na função getAllProducts', () => {
  before(async () => {
    const mock = []
    sinon.stub(productsModel, 'getAllProducts').resolves(mock)
  });

  after(() => productsModel.getAllProducts.restore());

  it('retorna um array', async () => {
    const response = await productsServices.getAllProducts();
    expect(response).to.be.an('array');
  })

  it('retorna um array vazio', async () => {
    const response = await productsServices.getAllProducts();
    expect(response).to.be.empty;
  })
})

describe('verifica caso tenha produtos no banco de dados', () => {
  const mock = [{
    id: 1,
    name: "Martelo de Thor",
    quantity: 10
  }]

  before(async () => {
    sinon.stub(productsModel, 'getAllProducts').resolves(mock);
  })

  after(async () => {
    productsModel.getAllProducts.restore();
  })

  it('retorna um array', async () => {
    const response = await productsServices.getAllProducts();
    expect(response).to.be.an('array');
  })

  it('retorna um array não vazio', async () => {
    const response = await productsServices.getAllProducts();
    expect(response).to.be.not.empty;
  })

  it('retorna um array com as chaves id,name,quantity', async () => {
    const [response] = await productsServices.getAllProducts();
    expect(response).to.have.keys(['id', 'name', 'quantity']);
  })
})


describe('verifica comportamentos da função getProductsById', () => {
  describe('verifica se ao passar um id valido, retorna um objeto com as informações', () => {
    const mockId = 12
    const productsDbMocked = [{
      id: 12,
      name: "Martelo de Thor",
      quantity: 10
    }]
    before(async () => {
      sinon.stub(productsModel, 'getProductsById').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.getProductsById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.getProductsById(mockId);

      expect(response).to.be.an('object');
    })

    it('retorna um objeto não vazio', async () => {
      const response = await productsServices.getProductsById(mockId);
      expect(response).to.be.not.empty;
    })

    it('retorna um objeto as chaves id ,name ,quantity', async () => {
      const response = await productsServices.getProductsById(mockId);
      expect(response).to.have.keys(['id', 'name', 'quantity']);
    })
  })

  describe("verifica caso o id passado nao exista, receba a mensagem 'Product not found'", () => {
    const mockId = 2
    const messageResponseMocked = { error: { message: 'Product not found' }, status: 404 }
    before(async () => {
      sinon.stub(productsModel, 'getProductsById').resolves(messageResponseMocked);
    })

    after(async () => {
      productsModel.getProductsById.restore();
    })

    it('retorna objeto contendo uma mensagem de erro e o seu status', async () => {
      const response = await productsServices.getProductsById(mockId);
      expect(response).to.be.deep.equal(messageResponseMocked);
    })
  })

})


describe('verifica comportamentos da função checkIfProductAlreadyExistsInDb', () => {
  const mockName = "Martelo de Thor";
  describe('verifica se retorna uma mensagem de erro se o nome ja existir banco de dados', () => {
    const messageResponseMocked = { error: { message: 'Product already exists' }, status: 409 };
    const productsDbMocked = [{
      name: 'test',
      quantity: 11
    }]
    before(async () => {
      next = sinon.stub()
      sinon.stub(productsModel, 'getProductsByName').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.getProductsByName.restore();
    });


    it('retorna uma mensagem de erro', async () => {
      const response = await productsServices.checkIfProductAlreadyExistsInDb(mockName);

      expect(response).to.be.deep.equal(messageResponseMocked);
    })
  })
})

 describe('verifica comportamentos na função createProduct', () => {
  describe('verifica se recebe um objeto ao cadastrar um novo produto', () => {

    const productsDbMocked = {
      id: 12,
      name: "Martelo de Thor",
      quantity: 10
    }

    const newProductMocked = {
      name: "qualquer de Thor",
      quantity: 10
    }
    before(async () => {
      sinon.stub(productsModel, 'createProduct').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.createProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.createProduct(newProductMocked);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves id,name,quantity', async () => {
      const response = await productsServices.createProduct(newProductMocked);
      expect(response).to.have.keys(['id', 'name', 'quantity']);
    })

  })
}) 

describe('verifica comportamentos da função checkIfProductIdExistInDb', () => {
  describe('verifica se retorna a mensagem de erro corretamente caso nao haja o id passado como parametro ', () => {
    const mockId = 55
    const messageResponseMocked = { error: { message: 'Product not found' }, status: 404 };
    before(async () => {
      sinon.stub(productsModel, 'getProductsById').resolves(messageResponseMocked)
    });

    after(async () => {
      productsModel.getProductsById.restore();
    });

    it('retorna uma mensagem de erro caso o id nao exista', async () => {
      const response = await productsServices.checkIfProductIdExistInDb(mockId);

      expect(response).to.be.deep.equal(messageResponseMocked);
    })

  })
})
 describe('verifica comportamentos da função updateProduct', () => {
  const productsDbMocked = {
    id: 1,
    name: "Martelo",
    quantity: 1000
  }
  const editedProductMocked = {
    name: "Martelo de Thor",
    quantity: 10
  }
  describe('verifica se retorna o objeto com os dados do produto editado ', () => {
    const mockId = 1

    before(async () => {
      sinon.stub(productsModel, 'updateProduct').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.updateProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.updateProduct(editedProductMocked, mockId);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com as chaves id,name,quantity', async () => {
      const response = await productsServices.updateProduct(editedProductMocked, mockId);
      expect(response).to.have.keys('id', 'name', 'quantity');
    })
  })

  describe('verifica se retorna a mensagem de erro ao passar um id que nao existe', () => {
    const mockId = 4
    const messageResponseMocked = { error: { message: 'Product not found' }, status: 404 };
    before(async () => {
      sinon.stub(productsModel, 'updateProduct').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.updateProduct.restore();
    });

    it('retorna uma mensagem de erro caso o id nao exista', async () => {
      const response = await productsServices.updateProduct(editedProductMocked, mockId);
      expect(response).to.be.deep.equal(messageResponseMocked);
    })
  })
}) 
 describe('verifica comportamentos na rota DELETE /products/:id', () => {
  const productsDbMocked = {
    id: 1,
    name: "Martelo",
    quantity: 1000
  }
  describe('verifica se retorna a mensagem de erro caso nao exista o id passado como parametro ', async () => {
    const mockId = 55
    const messageResponseMocked = { error: { message: 'Product not found' }, status: 404 };

    before(async () => {
      next = sinon.stub()
      sinon.stub(productsModel, 'removeProduct').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.removeProduct.restore();
    });

    it("retorna o objeto com a mensagem 'Product not found'", async () => {
      const response = await productsServices.removeProduct(mockId);
      expect(response).to.be.deep.equal(messageResponseMocked);
    })
  })
}) 