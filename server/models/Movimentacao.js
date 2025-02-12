const mongoose = require("mongoose");

const movimentacaoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ["entrada", "saida"],
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
    min: 1,
  },
  data_movimento: {
    type: Date,
    default: Date.now,
  },
  observacao: {
    type: String,
  },
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
    required: true,
  },
  armazem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Armazem",
    required: true,
  },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
});

const Movimentacao = mongoose.model("Movimentacao", movimentacaoSchema);
module.exports = Movimentacao;
