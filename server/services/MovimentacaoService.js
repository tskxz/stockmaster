const Movimentacao = require("../models/Movimentacao");
const Produto = require("../models/Produto");
const Armazem = require("../models/Armazem");

class MovimentacaoService {
  constructor() {}

  async criarMovimentacao({ tipo, quantidade, produtoId, armazemId, observacao }, empresaId) {
    const quantidadeNum = parseInt(quantidade, 10);  // Converter a quantidade para número
    if (isNaN(quantidadeNum)) {
      throw new Error("Quantidade inválida.");
    }

    // Verifica se o armazém pertence à empresa autenticada
    const armazem = await Armazem.findOne({ _id: armazemId, empresa: empresaId });
    if (!armazem) {
      throw new Error("O armazém não pertence à empresa autenticada.");
    }

    // Verifica se o produto pertence à empresa e está no armazém correto
    const produto = await Produto.findOne({ _id: produtoId, armazem: armazemId, empresa: empresaId });
    if (!produto) {
      throw new Error("O produto não pertence à empresa autenticada ou não está nesse armazém.");
    }

    // Verifica se há estoque suficiente para saída
    if (tipo === "saida" && produto.stock_total < quantidadeNum) {
      throw new Error("Estoque insuficiente para essa saída.");
    }

    // Atualiza o estoque do produto
    if (tipo === "entrada") {
      produto.stock_total += quantidadeNum;  // Somar a quantidade de entrada
    } else if (tipo === "saida") {
      produto.stock_total -= quantidadeNum;  // Subtrair a quantidade de saída
    }

    // Salva o produto com o estoque atualizado
    await produto.save();

    // Registra a movimentação
    const movimentacao = await Movimentacao.create({
      tipo,
      quantidade: quantidadeNum,  // Salva a quantidade como número
      produto: produtoId,
      armazem: armazemId,
      empresa: empresaId,
      observacao,
    });

    return movimentacao;
  }

  // Buscar movimentações da empresa
  async getMovimentacoes(empresaId) {
    return Movimentacao.find({ empresa: empresaId })
      .populate("produto", "nome")
      .populate("armazem", "nome")
      .sort({ data_movimento: -1 });
  }
}

module.exports = new MovimentacaoService();
