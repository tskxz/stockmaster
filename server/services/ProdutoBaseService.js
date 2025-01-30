class ProdutoBaseService {
    constructor(model) {
      this.model = model;
    }
  
    // Método para criar produto
    async criarProduto(dadosProduto, empresaId) {
      const { nome, descricao, preco, stock_total, stock_minimo, armazemId, categoriaId } = dadosProduto;
  
      // Lógica de validação básica
      if (!nome || !preco || !stock_total || !armazemId) {
        throw new Error("Faltam dados obrigatórios para criar o produto.");
      }
  
      // Criação do produto
      const novoProduto = await this.model.create({
        nome,
        descricao,
        preco,
        stock_total,
        stock_minimo,
        empresa: empresaId,
        armazem: armazemId,
        status: stock_total <= stock_minimo ? "STOCK BAIXO" : "",
        categoria: categoriaId || null,
      });
  
      return novoProduto;
    }
  
    // Método para obter todos os produtos de um armazém
    async getProdutosByArmazem(armazemId, empresaId) {
      return await this.model.find({ armazem: armazemId, empresa: empresaId }).populate("categoria").populate("armazem").populate("empresa");
    }
  
    // Método para editar um produto
    async editarProduto(produtoId, dadosAtualizados, empresaId) {
      const produto = await this.model.findById(produtoId);
      if (!produto) {
        throw new Error("Produto não encontrado.");
      }
  
      // Atualização de dados
      produto.nome = dadosAtualizados.nome || produto.nome;
      produto.descricao = dadosAtualizados.descricao || produto.descricao;
      produto.preco = dadosAtualizados.preco || produto.preco;
      produto.stock_total = dadosAtualizados.stock_total || produto.stock_total;
      produto.stock_minimo = dadosAtualizados.stock_minimo || produto.stock_minimo;
      produto.status = produto.stock_total <= produto.stock_minimo ? "STOCK BAIXO" : "";
      produto.categoria = dadosAtualizados.categoriaId || produto.categoria;
  
      return await produto.save();
    }
  }
  
  module.exports = ProdutoBaseService;
  