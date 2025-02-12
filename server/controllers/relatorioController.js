const relatorioService = require("../services/RelatorioService");

const getRelatorioInventario = async (req, res) => {
  try {
    const relatorio = await relatorioService.getRelatorioInventario(req.empresa._id);

    res.status(200).json({
      status: "success",
      data: relatorio,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { getRelatorioInventario };
