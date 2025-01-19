const Empresa = require("../models/Empresa");

// Get All Empresas
const getAllEmpresas = async function (req, res) {
  try {
    const empresas = await Empresa.find();
    res.status(200).json({
      status: "success",
      results: empresas.length,
      data: {
        empresas,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
    return;
  }
};

const getEmpresa = async function (req, res) {
  try {
    const empresa = await Empresa.findById(req.params.id);

    if (!empresa) {
      return res.status(404).json({
        status: "error",
        message: "Empresa not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        empresa,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
    return;
  }
};

const createEmpresa = async function (req, res) {
  try {
    const newEmpresa = await Empresa.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(201).json({
      status: "success",
      data: {
        empresa: newEmpresa,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

const updateEmpresa = async function (req, res) {
  try {
    const updatedEmpresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEmpresa) {
      return res.status(404).json({
        status: "error",
        message: "Empresa not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        empresa: updatedEmpresa,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

const deleteEmpresa = async function (req, res) {
  try {
    const deletedEmpresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!deletedEmpresa) {
      return res.status(404).json({
        status: "error",
        message: "Empresa not found",
      });
    } else {
      res.status(204).json({
        status: "success",
        message: "Empresa deleted successfully",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
    return;
  }
};

const minha_empresa = async function (req, res) {
  try {
    const empresa = await Empresa.findById(req.empresa._id);

    if (!empresa) {
      return res.status(404).json({
        status: "error",
        message: "Empresa not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        empresa,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

module.exports = {
  getAllEmpresas,
  getEmpresa,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
  minha_empresa,
};