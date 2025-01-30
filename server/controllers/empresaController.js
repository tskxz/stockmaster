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

const createEmpresa = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    // Validação inicial no controlador (antes do Mongoose)
    if (!password || password.length < 8) {
      return res.status(400).json({
        status: "error",
        message: "A senha deve ter pelo menos 8 caracteres.",
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        status: "error",
        message: "As senhas não coincidem.",
      });
    }

    // Criação na base de dados
    const newEmpresa = await Empresa.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    res.status(201).json({
      status: "success",
      data: {
        empresa: newEmpresa,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      // Captura erros de validação do Mongoose
      const errorMessages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        status: "error",
        message: errorMessages.join(" "),
      });
    }

    // Log para monitoramento e resposta genérica
    console.error("Erro no servidor:", err);
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro no servidor. Tente novamente mais tarde.",
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