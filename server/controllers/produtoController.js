const ProdutoService = require("../services/ProdutoService");
const produtoService = new ProdutoService();


const criarProduto = async function (req, res) {
  try {
    const novoProduto = await produtoService.criarProduto(req.body, req.empresa._id);
    res.status(201).json({
      status: "success",
      data: { produto: novoProduto },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProdutosByArmazem = async function (req, res) {
  try {
    const produtos = await produtoService.getProdutosByArmazem(req.params.armazemId, req.empresa._id);
    res.status(200).json({
      status: "success",
      results: produtos.length,
      data: { produtos },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProduto = async function (req, res) {
  try {
    const produto = await produtoService.getProduto(req.params.produtoId, req.empresa._id);
    res.status(200).json({
      status: "success",
      data: { produto },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const editarProduto = async function (req, res) {
  try {
    const produtoAtualizado = await produtoService.editarProduto(req.params.produtoId, req.body, req.empresa._id);
    res.status(200).json({
      status: "success",
      data: { produto: produtoAtualizado },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  criarProduto,
  getProdutosByArmazem,
  getProduto,
  editarProduto,
};
