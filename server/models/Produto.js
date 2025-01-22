const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  stock_total: { type: Number, default: 0 },
  stock_minimo: { type: Number, default: 0 },
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true },
  armazem: { type: mongoose.Schema.Types.ObjectId, ref: "Armazem", required: true },
});

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = Produto;
