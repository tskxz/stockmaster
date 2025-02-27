const ProdutoBaseService = require('./ProdutoBaseService');
const ProdutoModel = require('../models/Produto');
const ArmazemModel = require('../models/Armazem');
const CategoriaModel = require('../models/Categoria');

class ProdutoService extends ProdutoBaseService {
  constructor() {
    super(ProdutoModel);
  }

  // Sobrescreve o método criarProduto para adicionar validações específicas
  async criarProduto(dadosProduto, empresaId) {
    const { nome, descricao, preco, stock_total, stock_minimo, armazemId, categoriaId } = dadosProduto;

    // Verifica se o armazém pertence à empresa
    const armazem = await ArmazemModel.findOne({ _id: armazemId, empresa: empresaId });
    if (!armazem) {
      throw new Error("O armazém não pertence à empresa autenticada ou não foi encontrado.");
    }

    // Valida a categoria (opcional)
    if (categoriaId) {
      const categoria = await CategoriaModel.findOne({ _id: categoriaId, empresa: empresaId });
      if (!categoria) {
        throw new Error("A categoria não pertence à empresa autenticada.");
      }
    }

    // Verifica a capacidade do armazém
    const produtos = await ProdutoModel.find({ armazem: armazemId });
    const totalStockAtual = produtos.reduce((total, produto) => total + produto.stock_total, 0);
    if (parseInt(totalStockAtual) + parseInt(stock_total) > parseInt(armazem.capacidade)) {
      throw new Error("A capacidade do armazém seria excedida.");
    }

    // Verifica se o stock_minimo não ultrapassa a capacidade do armazém
    if (dadosProduto.stock_minimo && parseInt(dadosProduto.stock_minimo, 10) > armazem.capacidade) {
      throw new Error(`O estoque mínimo (${dadosProduto.stock_minimo}) não pode ser maior que a capacidade do armazém (${armazem.capacidade}).`);
    }

    // Chama o método da classe base para criar o produto
    return super.criarProduto(dadosProduto, empresaId);
  }

  // Sobrescreve o método editarProduto para adicionar validações de capacidade
  async editarProduto(produtoId, dadosAtualizados, empresaId) {
    const produto = await ProdutoModel.findById(produtoId).populate("armazem").populate("empresa").populate("categoria");
    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    // Verifica se o produto pertence à empresa
    console.log(empresaId.toString())
    if (produto.empresa._id.toString() !== empresaId.toString()) {
      throw new Error("Você não tem permissão para editar este produto.");
    }

    // Verifica a capacidade do armazém
    const armazem = await ArmazemModel.findById(produto.armazem);
    const produtos = await ProdutoModel.find({ armazem: armazem._id }).populate("armazem").populate("empresa").populate("categoria");
    const totalStockAtualizado = produtos.reduce((total, p) => {
      return p._id.toString() === produtoId
        ? total + parseInt(dadosAtualizados.stock_total || 0, 10)
        : total + parseInt(p.stock_total, 10);
    }, 0);

    if (totalStockAtualizado > armazem.capacidade) {
      throw new Error("A capacidade do armazém seria excedida.");
    }

    // Verifica se o stock_minimo não ultrapassa a capacidade do armazém
    if (dadosAtualizados.stock_minimo && parseInt(dadosAtualizados.stock_minimo, 10) > armazem.capacidade) {
      throw new Error(`O estoque mínimo (${dadosAtualizados.stock_minimo}) não pode ser maior que a capacidade do armazém (${armazem.capacidade}).`);
    }

    // Chama o método da classe base para editar o produto
    return super.editarProduto(produtoId, dadosAtualizados, empresaId);
  }

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
}

module.exports = new ProdutoService();
