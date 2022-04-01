const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');

describe('verifica comportamentos produtos na camada de serviço', () => {
  describe('verifica caso nao retorne produto na função getAllProducts', async () => {
    before(async () => {
      const mock = []
      sinon.stub(productsModel,'getAllProducts').resolves(mock)
    });

    after(()=>productsModel.getAllProducts.restore());

    it('retorna um array', async () => {
      const response = await productsServices.getAllProducts();
      expect(response).to.be.an('array');
    })

    it('retorna um array vazio', async () => {
      const response = await productsServices.getAllProducts();
      expect(response).to.be.empty;
    })
  })

  describe('verifica caso tenha produtos no banco de dados', async () => {
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
})

describe('verifica comportamentos da função getProductsById', () => {
  describe('verifica se ao passar um id valido,não retorna um array vazio', async () => {
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

    it('retorna um array', async () => {
      const response = await productsServices.getProductsById(mockId);
      expect(response).to.be.an('array');
    })

    it('retorna um array não vazio', async () => {
      const response = await productsServices.getProductsById(mockId);
      expect(response).to.be.not.empty;
    })

    it('retorna um array com um objeto dentro contendo as chaves id ,name ,quantity', async () => {
      const response = await productsServices.getProductsById(mockId);
      expect(response[0]).to.have.keys(['id', 'name', 'quantity']);
    })
  })

  describe("verifica caso o id passado nao exista, receba a mensagem 'Product not found'", async () => {
    const productsDbMocked = [{
      id: 12,
      name: "Martelo de Thor",
      quantity: 10
    }]
    const mockId = 2
    const messageResponseMocked = { error: { message: 'Product not found' }, status: 404 }
    before(async () => {
      sinon.stub(productsModel, 'getProductsById').resolves(productsDbMocked);
    })

    after(async () => {
      productsModel.getProductsById.restore();
    })

    it('retorna um objeto', async () => {
      const response = await productsServices.getProductsById(mockId);
      expect(response).to.be.an('object');
    })

    it('retorna uma mensagem de erro', async () => {
      const response = await productsServices.getProductsById(mockId);
      expect(response).to.deep.equal(messageResponseMocked);
    })
  })

})


describe('verifica comportamentos da função checkIfProductAlreadyExistsInDb', () => {
  const mockName = "Martelo de Thor";
  describe('verifica se retorna uma mensagem de erro se o nome ja existir banco de dados', async () => {
    const productsDbMocked = [{
      id: 12,
      name: "Martelo de Thor",
      quantity: 10
    }]
    const messageResponseMocked = { error: { message: 'Product already exists' }, status: 400 }
    before(async () => {
      sinon.stub(productsModel, 'getProductsByName').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.getProductsByName.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.getProductsByName(mockName);
      expect(response).to.be.an('object');
    })

    it('retorna uma mensagem de erro', async () => {
      const response = await productsServices.getProductsByName(mockName);
      expect(response).to.deep.equal(messageResponseMocked);
    })
  })
})


describe('verifica comportamentos na função createProduct', () => {
  describe('verifica se recebe uma mensagem de erro ao tentar cadastrar um nome ja existente', async () => {
    const messageResponseMocked = { error: { message: 'Product already exists' }, status: 400 }

    const productsDbMocked = {
      id: 12,
      name: "Martelo de Thor",
      quantity: 10
    }

    const newProductMocked = {
      name: "Martelo de Thor",
      quantity: 10
    }
    before(async () => {
      const mock = productsDbMocked
      sinon.stub(productsModel, 'createProduct').resolves(mock)
    });

    after(async () => {
      productsModel.createProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.createProduct(newProductMocked);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com uma mensagem de erro', async () => {
      const response = await productsServices.createProduct(newProductMocked);
      expect(response).to.deep.equal(messageResponseMocked);
    })
  })

  describe('verifica se recebe um objeto ao cadastrar um novo produto', async () => {
    
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
       productsDbMocked
      sinon.stub(productsModel, 'createProduct').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.createProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.createProduct(newProductMocked);
      expect(response).to.be.an('object');
    })

    it('retorna um objeto com uma mensagem de erro', async () => {
      const response = await productsServices.createProduct(newProductMocked);
      expect(response).to.deep.equal(messageResponseMocked);
    })
  })
})


describe('verifica comportamentos da função checkIfProductIdExistInDb', () => {
  describe('verifica se retorna a mensagem de erro corretamente caso nao haja o id passado como parametro ', async () => {
    const mockId = 55
    const productsDbMocked = [{
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]
const messageResponseMocked = { error: { message: 'Product not found' }, status: 404 }
    before(async () => {
      sinon.stub(productsModel, 'getProductsById').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.getProductsById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.checkIfProductIdExistInDb(mockId);
      expect(response).to.be.an('object');
    })

    it('retorna uma mensagem de erro caso o id nao exista', async () => {
      const response = await productsServices.checkIfProductIdExistInDb(mockId);
      expect(response).to.deep.equal(messageResponseMocked);
    })

  })
})

describe('verifica comportamentos da função updateProduct', () => {
  describe('verifica se retorna o objeto com os dados do produto editado ', async () => {
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
    const mockedResponse = { id: mockId, ...editedProductMocked }
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
      expect(response).to.have.keys(['id', 'name', 'quantity']);
    })
    it('retorna o objeto correto', async () => {
      const [response] = await productsServices.updateProduct(editedProductMocked, mockId);
      expect(response).to.deep.equal(mockedResponse);
    })
  })

  describe('verifica se retorna a mensagem de erro ao passar um id que nao existe', async () => {
    const mockId = 4
    const productsDbMocked = [{
      id: 5,
      name: "Martelo",
      quantity: 1000
    }]
    const messageResponseMocked = { error: { message: 'Product not found' }, status: 404 }
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

    it('retorna uma mensagem de erro caso o id nao exista', async () => {
      const response = await productsServices.updateProduct(mockId);
      expect(response).to.deep.equal(messageResponseMocked);
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
      sinon.stub(productsModel, 'removeProduct').resolves(productsDbMocked)
    });

    after(async () => {
      productsModel.removeProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.removeProduct(mockId);
      expect(response).to.be.an('object');
    })

    it("retorna o objeto com a mensagem 'Product not found'", async () => {
      const response = await productsServices.removeProduct(mockId);
      expect(response).to.deep.equal(messageResponseMocked);
    })
  })
})