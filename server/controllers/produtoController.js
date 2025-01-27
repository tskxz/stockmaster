const Produto = require("../models/Produto");
const Armazem = require("../models/Armazem");

const criarProduto = async function (req, res) {
  try {
    const { nome, descricao, preco, stock_total, stock_minimo, armazemId } = req.body;

    // Verifica se o armazém pertence à empresa autenticada
    const armazem = await Armazem.findOne({ _id: armazemId, empresa: req.empresa._id });
    if (!armazem) {
      return res.status(403).json({
        status: "error",
        message: "O armazém não pertence à empresa autenticada ou não foi encontrado.",
      });
    }

    const produtos = await Produto.find({ armazem: armazemId });
    const totalStock = produtos.reduce((total, produto) => total + produto.stock_total, 0);
    
    // Verifica se o novo stock total não excede a capacidade do armazém e não ultrapassa o stock mínimo
    const stock_total_atual = parseInt(totalStock, 10) + parseInt(stock_total, 10);
    if (stock_total_atual > armazem.capacidade) {
      return res.status(400).json({
        status: "error",
        message: "Não é possível criar outro produto, pois a capacidade do armazém seria excedida.",
      });
    }
    
    // Cria o produto associado à empresa e ao armazém
    if(stock_total > armazem.capacidade || stock_minimo > armazem.capacidade){
      return res.status(400).json({
        status: "error",
        message: "O stock total e o stock mínimo não podem ultrapassar a capacidade do armazém.",
      });
    }

    const novoProduto = await Produto.create({
      nome,
      descricao,
      preco,
      stock_total,
      stock_minimo,
      empresa: req.empresa._id,
      armazem: armazemId,
    });

    res.status(201).json({
      status: "success",
      data: {
        produto: novoProduto,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProdutosByArmazem = async function (req, res) {
  try {
    const { armazemId } = req.params;

    // Verifica se o armazém pertence à empresa autenticada
    const armazem = await Armazem.findOne({ _id: armazemId, empresa: req.empresa._id });
    if (!armazem) {
      return res.status(403).json({
        status: "error",
        message: "O armazém não pertence à empresa autenticada ou não foi encontrado.",
      });
    }

    // Busca os produtos do armazém
    const produtos = await Produto.find({ armazem: armazemId });

    res.status(200).json({
      status: "success",
      results: produtos.length,
      data: {
        produtos,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProduto = async function (req, res) {
    try {
      const { produtoId } = req.params;
  
      // Busca o produto pelo ID
      const produto = await Produto.findById(produtoId).populate("armazem").populate("empresa");
  
      if (!produto) {
        return res.status(404).json({
          status: "error",
          message: "Produto não encontrado.",
        });
      }
  
      // Verifica se o produto pertence à empresa autenticada
      if (produto.armazem.empresa.toString() !== req.empresa._id.toString()) {
        return res.status(403).json({
          status: "error",
          message: "Você não tem permissão para acessar este produto.",
        });
      }
      
  
      res.status(200).json({
        status: "success",
        data: {
          produto,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
};

const editarProduto = async function (req, res) {
  try {
    const { produtoId } = req.params;
    const { nome, descricao, preco, stock_total, stock_minimo } = req.body;

    // Busca o produto pelo ID
    const produto = await Produto.findById(produtoId).populate("armazem");

    const produtos = await Produto.find({ armazem: produto.armazem.id });

    const totalStockAtualizado = produtos.reduce((total, p) => {
      return p._id.toString() === produtoId
        ? total + parseInt(stock_total || 0, 10)
        : total + parseInt(p.stock_total, 10);
    }, 0);
    
    if (totalStockAtualizado > produto.armazem.capacidade) {
      return res.status(400).json({
        status: "error",
        message: "Não é possível editar o produto, pois a capacidade do armazém seria excedida.",
      });
    }
    
  
    if (!produto) {
      return res.status(404).json({
        status: "error",
        message: "Produto não encontrado.",
      });
    }

    // Verifica se o produto pertence à empresa autenticada
    if (produto.empresa.toString() !== req.empresa._id.toString()) {
      return res.status(403).json({
        status: "error",
        message: "Você não tem permissão para editar este produto.",
      });
    }

    // Atualiza o produto
    produto.nome = nome || produto.nome;
    produto.descricao = descricao || produto.descricao;
    produto.preco = preco || produto.preco;
    produto.stock_total = stock_total || produto.stock_total;
    produto.stock_minimo = stock_minimo || produto.stock_minimo;
    if(produto.stock_total <= produto.stock_minimo){
      produto.status = "STOCK BAIXO"
    } else {
      produto.status = ""
    };

    const produtoAtualizado = await produto.save();

    res.status(200).json({
      status: "success",
      data: {
        produto: produtoAtualizado,
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
  criarProduto,
  getProdutosByArmazem,
  getProduto,
  editarProduto,
};
