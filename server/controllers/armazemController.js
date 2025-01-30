const armazemService = require('../services/ArmazemService');

const criarArmazem = async function criarArmazem(req, res) {
  try {
    // Obter o ID da empresa autenticada
    const empresaId = req.empresa._id;

    // Criar um novo armazém usando o serviço
    const novoArmazem = await armazemService.criarArmazem(req.body, empresaId);

    res.status(201).json({
      status: "success",
      data: { armazem: novoArmazem },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
  };

const getArmazensPorEmpresaAutenticada = async function (req, res) {
  try {
    const armazens = await armazemService.getArmazensPorEmpresa(req.empresa._id);

    res.status(200).json({
      status: "success",
      results: armazens.length,
      data: { armazens },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
  };

  const getArmazem = async function (req, res) {
    try {
      const armazem = await armazemService.getArmazemPorId(req.params.armazemId);
  
      res.status(200).json({
        status: "success",
        data: { armazem },
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
};

const editarArmazem = async function (req, res) {
  try {
    const armazemAtualizado = await armazemService.editarArmazem(req.params.armazemId, req.body);

    res.status(200).json({
      status: "success",
      data: { armazem: armazemAtualizado },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  criarArmazem,
  getArmazensPorEmpresaAutenticada,
  getArmazem,
  editarArmazem,
};