const ProdutoModel = require("../models/Produto");
const ArmazemModel = require("../models/Armazem");

class RelatorioService {
  constructor() {}

  // Quantidade total de produtos e estoque na empresa
  async getEstoqueTotalEmpresa(empresaId) {
    const produtos = await ProdutoModel.find({ empresa: empresaId });

    const totalProdutos = produtos.length;
    const totalEstoque = produtos.reduce((acc, produto) => acc + produto.stock_total, 0);

    return { totalProdutos, totalEstoque };
  }

  // Estoque detalhado por armazém
  async getEstoquePorArmazem(empresaId) {
    const armazens = await ArmazemModel.find({ empresa: empresaId });

    const relatorioArmazem = await Promise.all(
      armazens.map(async (armazem) => {
        const produtos = await ProdutoModel.find({ armazem: armazem._id });

        const totalProdutos = produtos.length;
        const totalEstoque = produtos.reduce((acc, produto) => acc + produto.stock_total, 0);

        return {
          armazemId: armazem._id,
          nome: armazem.nome,
          capacidade: armazem.capacidade,
          totalProdutos,
          totalEstoque,
        };
      })
    );

    return relatorioArmazem;
  }

  // Gera o relatório completo de inventário
  async getRelatorioInventario(empresaId) {
    const estoqueEmpresa = await this.getEstoqueTotalEmpresa(empresaId);
    const estoqueArmazem = await this.getEstoquePorArmazem(empresaId);

    return {
      empresaId,
      totalProdutosEmpresa: estoqueEmpresa.totalProdutos,
      totalEstoqueEmpresa: estoqueEmpresa.totalEstoque,
      estoquePorArmazem: estoqueArmazem,
    };
  }
}

module.exports = new RelatorioService();
