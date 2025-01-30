const ProdutoModel = require("../models/Produto");
const ArmazemModel = require("../models/Armazem");
const CategoriaModel = require("../models/Categoria");

class ProdutoService {
  // Método para criar um produto com validações de estoque
  async criarProduto(dadosProduto, empresaId) {
    const { nome, descricao, preco, stock_total, stock_minimo, armazemId, categoriaId } = dadosProduto;

    // Verifica se o armazém pertence à empresa autenticada
    const armazem = await ArmazemModel.findOne({ _id: armazemId, empresa: empresaId });
    if (!armazem) {
      throw new Error("O armazém não pertence à empresa autenticada ou não foi encontrado.");
    }

    // Verifica se a categoria pertence à empresa
    let categoria = null;
    if (categoriaId) {
      categoria = await CategoriaModel.findOne({ _id: categoriaId, empresa: empresaId });
      if (!categoria) {
        return res.status(403).json({
          status: "error",
          message: "A categoria não pertence à empresa autenticada ou não foi encontrada.",
        });
      }
    }

    // Verifica se o estoque total excede a capacidade do armazém
    const produtos = await ProdutoModel.find({ armazem: armazemId });
    const totalStockAtual = produtos.reduce((total, produto) => total + produto.stock_total, 0);
    if (totalStockAtual + stock_total > armazem.capacidade) {
      throw new Error("A capacidade do armazém seria excedida.");
    }

    // Verifica se o stock mínimo ou total excedem a capacidade do armazém
    if (stock_total > armazem.capacidade || stock_minimo > armazem.capacidade) {
      throw new Error("O stock total e o stock mínimo não podem ultrapassar a capacidade do armazém.");
    }

    // Define o status de estoque
    const status = stock_total <= stock_minimo ? "STOCK BAIXO" : "";

    // Cria o produto
    return await ProdutoModel.create({
      nome,
      descricao,
      preco,
      stock_total,
      stock_minimo,
      empresa: empresaId,
      armazem: armazemId,
      status,
      categoria: categoria ? categoria._id : null,
    });
  }

  // Método para buscar produtos por armazém
  async getProdutosByArmazem(armazemId, empresaId) {
    const armazem = await ArmazemModel.findOne({ _id: armazemId, empresa: empresaId });
    if (!armazem) {
      throw new Error("O armazém não pertence à empresa autenticada ou não foi encontrado.");
    }

    // Busca os produtos do armazém
    return await ProdutoModel.find({ armazem: armazemId }).populate("categoria");
  }

  // Método para buscar um único produto
  async getProduto(produtoId, empresaId) {
    const produto = await ProdutoModel.findById(produtoId).populate("armazem").populate("empresa").populate("categoria");
    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    // Verifica se o produto pertence à empresa autenticada
    if (produto.armazem.empresa.toString() !== empresaId.toString()) {
      throw new Error("Você não tem permissão para acessar este produto.");
    }

    return produto;
  }

  // Método para editar um produto
  async editarProduto(produtoId, dadosAtualizados, empresaId) {
    const { nome, descricao, preco, stock_total, stock_minimo, categoriaId } = dadosAtualizados;

    const produto = await ProdutoModel.findById(produtoId).populate("armazem");
    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    // Verifica se o produto pertence à empresa autenticada
    if (produto.empresa.toString() !== empresaId.toString()) {
      throw new Error("Você não tem permissão para editar este produto.");
    }

    // Valida o estoque total atualizado
    const produtos = await ProdutoModel.find({ armazem: produto.armazem._id });
    const totalStockAtualizado = produtos.reduce((total, p) => {
      return p._id.toString() === produtoId
        ? total + parseInt(stock_total || 0, 10)
        : total + parseInt(p.stock_total, 10);
    }, 0);
    if (totalStockAtualizado > produto.armazem.capacidade) {
      throw new Error("A capacidade do armazém seria excedida.");
    }

    // Verifica se a categoria pertence à empresa
    let categoria = null;
    if (categoriaId) {
      categoria = await CategoriaModel.findOne({ _id: categoriaId, empresa: empresaId });
      if (!categoria) {
        throw new Error("A categoria não pertence à empresa autenticada ou não foi encontrada.")
      }
    }

    // Atualiza o produto
    produto.nome = nome || produto.nome;
    produto.descricao = descricao || produto.descricao;
    produto.preco = preco || produto.preco;
    produto.stock_total = stock_total || produto.stock_total;
    produto.stock_minimo = stock_minimo || produto.stock_minimo;
    produto.status = produto.stock_total <= produto.stock_minimo ? "STOCK BAIXO" : "";
    produto.categoria = categoria ? categoria._id : produto.categoria;

    return await produto.save();
  }
}

module.exports = ProdutoService;
