const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true },
});

// Garante que não existam categorias com o mesmo nome dentro da mesma empresa
categoriaSchema.index({ nome: 1, empresa: 1 }, { unique: true });

const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;
