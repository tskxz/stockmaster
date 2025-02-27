const empresaService = require('../services/EmpresaService');
const Empresa = require('../models/Empresa');
const bcrypt = require('bcrypt')
// Get All Empresas
const getAllEmpresas = async function (req, res) {
  try {
    const empresas = await empresaService.getAll();
    res.status(200).json({
      status: "success",
      results: empresas.length,
      data: { empresas },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getEmpresa = async function (req, res) {
  try {
    const empresa = await empresaService.getEmpresa(req.params.id);
    res.status(200).json({
      status: "success",
      data: { empresa },
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

const createEmpresa = async (req, res) => {
  try {
    const newEmpresa = await empresaService.createEmpresa(req.body);
    res.status(201).json({
      status: "success",
      data: { empresa: newEmpresa },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateEmpresa = async function (req, res) {
  try {
    const empresaId = req.empresa._id;
    const dados = req.body;

    if (dados.password) {
      if (dados.password.length < 8) {
        return res.status(400).json({
          status: "error",
          message: "A password deve ter pelo menos 8 caracteres.",
        });
      }
      // Encriptar a nova passe
      dados.password = await bcrypt.hash(dados.password, 12);
      dados.passwordConfirm = undefined; 
    } else {

      delete dados.password;
      delete dados.passwordConfirm;
    }

    // Atualiza os dados da empresa
    const updatedEmpresa = await empresaService.updateEmpresa(empresaId, dados);
    
    res.status(200).json({
      status: "success",
      data: { empresa: updatedEmpresa },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteEmpresa = async function (req, res) {
  try {
    await empresaService.deleteEmpresa(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Empresa deletada com sucesso",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const minha_empresa = async function (req, res) {
  try {
    const empresa = await empresaService.getEmpresa(req.empresa._id);
    res.status(200).json({
      status: "success",
      data: { empresa },
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

const atualizarImagemEmpresa = async function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Nenhuma imagem foi enviada.",
      });
    }

    const empresa = await Empresa.findByIdAndUpdate(
      req.empresa._id,
      { imagem: req.file.path }, // Salva o caminho da imagem
      { new: true }
    );

    console.log(empresa)

    res.status(200).json({
      status: "success",
      message: "Imagem atualizada com sucesso!",
      data: { imagem: empresa.imagem },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
}

module.exports = {
  getAllEmpresas,
  getEmpresa,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
  minha_empresa,
  atualizarImagemEmpresa,
};