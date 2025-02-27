const empresaService = require('../services/EmpresaService');

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
    const updatedEmpresa = await empresaService.updateEmpresa(req.params.id, req.body);
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

    res.status(200).json({
      status: "success",
      message: "Imagem atualizada com sucesso!",
      data: { imagem: empresa.imagem },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar a imagem.",
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