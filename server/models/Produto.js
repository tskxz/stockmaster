const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    preco: { type: Number, required: true },
    stockTotal: { type: Number, required: true, default: 0 },
    stockMinimo: { type: Number, required: true, default: 0 },
    armazem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Armazem",
      required: true,
    },
    criadoEm: { type: Date, default: Date.now },
  });
  
  const Produto = mongoose.model("Produto", produtoSchema);
  
  module.exports = Produto;
  