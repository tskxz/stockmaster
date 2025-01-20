const Empresa = require("../models/Empresa");
const Armazem = require("../models/Armazem");
const criarArmazem = async function criarArmazem(req, res) {
    try {
      // Obter o ID da empresa autenticada
      const empresaId = req.empresa._id;
  
      // Criar um novo armazém vinculado à empresa autenticada
      const novoArmazem = await Armazem.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        capacidade: req.body.capacidade,
        empresa: empresaId,
      });
  
      res.status(201).json({
        status: "success",
        data: {
          armazem: novoArmazem,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

const getArmazensPorEmpresaAutenticada = async function (req, res) {
    try {
      // Obter todos os armazéns associados à empresa autenticada
      const armazens = await Armazem.find({ empresa: req.empresa._id });
  
      res.status(200).json({
        status: "success",
        results: armazens.length,
        data: {
          armazens,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

  const getArmazem = async function (req, res) {
    try {
      const { armazemId } = req.params;
  
      // Busca o armazem pelo ID
      const armazem = await Armazem.findById(armazemId);
  
      if (!armazem) {
        return res.status(404).json({
          status: "error",
          message: "Armazem não encontrado.",
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          armazem,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
};

const editarArmazem = async function (req, res) {
  try {
    const { armazemId } = req.params;

    // Busca o armazém pelo ID
    const armazem = await Armazem.findById(armazemId);

    if (!armazem) {
      return res.status(404).json({
        status: "error",
        message: "Armazém não encontrado.",
      });
    }

    // Atualiza os campos do armazém
    armazem.nome = req.body.nome || armazem.nome;
    armazem.endereco = req.body.endereco || armazem.endereco;
    armazem.capacidade = req.body.capacidade || armazem.capacidade;

    // Salva as alterações
    const armazemAtualizado = await armazem.save();

    res.status(200).json({
      status: "success",
      data: {
        armazem: armazemAtualizado,
      },
    });
  } catch (error) {
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