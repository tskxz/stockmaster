const Categoria = require("../models/Categoria");

// Criar uma nova categoria
const criarCategoria = async (req, res) => {
  try {
    const { nome } = req.body;

    // Verifica se a categoria já existe para esta empresa
    const categoriaExistente = await Categoria.findOne({ nome, empresa: req.empresa._id });
    if (categoriaExistente) {
      return res.status(400).json({
        status: "error",
        message: "Já existe uma categoria com esse nome para esta empresa.",
      });
    }

    const novaCategoria = await Categoria.create({
      nome,
      empresa: req.empresa._id, // A categoria pertence à empresa autenticada
    });

    res.status(201).json({
      status: "success",
      data: { categoria: novaCategoria },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Obter todas as categorias da empresa autenticada
const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({ empresa: req.empresa._id });

    res.status(200).json({
      status: "success",
      results: categorias.length,
      data: { categorias },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Obter uma única categoria
const getCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const categoria = await Categoria.findOne({ _id: categoriaId, empresa: req.empresa._id });

    if (!categoria) {
      return res.status(404).json({
        status: "error",
        message: "Categoria não encontrada ou não pertence à empresa autenticada.",
      });
    }

    res.status(200).json({
      status: "success",
      data: { categoria },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Atualizar categoria
const editarCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const { nome } = req.body;

    const categoria = await Categoria.findOne({ _id: categoriaId, empresa: req.empresa._id });

    if (!categoria) {
      return res.status(404).json({
        status: "error",
        message: "Categoria não encontrada ou não pertence à empresa autenticada.",
      });
    }

    // Verifica se já existe outra categoria com o mesmo nome
    const categoriaExistente = await Categoria.findOne({ nome, empresa: req.empresa._id });
    if (categoriaExistente && categoriaExistente._id.toString() !== categoriaId) {
      return res.status(400).json({
        status: "error",
        message: "Já existe uma categoria com esse nome.",
      });
    }

    categoria.nome = nome || categoria.nome;
    const categoriaAtualizada = await categoria.save();

    res.status(200).json({
      status: "success",
      data: { categoria: categoriaAtualizada },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Excluir categoria
const deletarCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;

    const categoria = await Categoria.findOne({ _id: categoriaId, empresa: req.empresa._id });

    if (!categoria) {
      return res.status(404).json({
        status: "error",
        message: "Categoria não encontrada ou não pertence à empresa autenticada.",
      });
    }

    await Categoria.deleteOne({ _id: categoriaId });

    res.status(200).json({
      status: "success",
      message: "Categoria deletada com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  criarCategoria,
  getCategorias,
  getCategoria,
  editarCategoria,
  deletarCategoria,
};
