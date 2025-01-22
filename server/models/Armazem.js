const mongoose = require("mongoose");

const armazemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  capacidade: { type: Number, required: true },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
  criadoEm: { type: Date, default: Date.now },
});

const Armazem = mongoose.model("Armazem", armazemSchema);

module.exports = Armazem;
