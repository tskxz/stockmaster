const categoriaService = require('../services/CategoriaService');

// Criar uma nova categoria
const criarCategoria = async (req, res) => {
  try {
    const { nome } = req.body;

    // Criar a categoria usando o serviço
    const novaCategoria = await categoriaService.criarCategoria({ nome }, req.empresa._id);

    res.status(201).json({
      status: "success",
      data: { categoria: novaCategoria },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Obter todas as categorias da empresa autenticada
const getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getCategoriasPorEmpresa(req.empresa._id);

    res.status(200).json({
      status: "success",
      results: categorias.length,
      data: { categorias },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Obter uma única categoria
const getCategoria = async (req, res) => {
  try {
    const categoria = await categoriaService.getCategoriaPorId(req.params.categoriaId, req.empresa._id);

    res.status(200).json({
      status: "success",
      data: { categoria },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

// Atualizar categoria
const editarCategoria = async (req, res) => {
  try {
    const categoriaAtualizada = await categoriaService.editarCategoria(
      req.params.categoriaId,
      req.body,
      req.empresa._id
    );

    res.status(200).json({
      status: "success",
      data: { categoria: categoriaAtualizada },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Excluir categoria
const deletarCategoria = async (req, res) => {
  try {
    await categoriaService.deletarCategoria(req.params.categoriaId, req.empresa._id);

    res.status(200).json({
      status: "success",
      message: "Categoria deletada com sucesso.",
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
  criarCategoria,
  getCategorias,
  getCategoria,
  editarCategoria,
  deletarCategoria,
};
