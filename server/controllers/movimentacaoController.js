const movimentacaoService = require("../services/MovimentacaoService");

const criarMovimentacao = async (req, res) => {
  try {
    const movimentacao = await movimentacaoService.criarMovimentacao(req.body, req.empresa._id);

    res.status(201).json({
      status: "success",
      data: { movimentacao },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getMovimentacoes = async (req, res) => {
  try {
    const movimentacoes = await movimentacaoService.getMovimentacoes(req.empresa._id);

    res.status(200).json({
      status: "success",
      results: movimentacoes.length,
      data: { movimentacoes },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  criarMovimentacao,
  getMovimentacoes,
};
