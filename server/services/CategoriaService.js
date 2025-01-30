const CategoriaBaseService = require('./CategoriaBaseService');
const CategoriaModel = require('../models/Categoria');

class CategoriaService extends CategoriaBaseService {
  constructor() {
    super(CategoriaModel); 
  }

  // Método para criar uma categoria vinculada à empresa autenticada
  async criarCategoria(dados, empresaId) {
    const categoriaExistente = await this.existsByName(dados.nome, empresaId);
    if (categoriaExistente) {
      throw new Error("Já existe uma categoria com esse nome para esta empresa.");
    }

    dados.empresa = empresaId;  // Atribui a empresa ao dado da categoria
    return await this.create(dados);
  }

  // Método para obter todas as categorias de uma empresa
  async getCategoriasPorEmpresa(empresaId) {
    return await this.model.find({ empresa: empresaId });
  }

  // Método para obter uma categoria por ID e garantir que pertence à empresa
  async getCategoriaPorId(id, empresaId) {
    const categoria = await this.getById(id);
    if (!categoria || categoria.empresa.toString() !== empresaId) {
      throw new Error("Categoria não encontrada ou não pertence à empresa autenticada.");
    }
    return categoria;
  }

  // Método para editar uma categoria
  async editarCategoria(id, dados, empresaId) {
    const categoria = await this.getCategoriaPorId(id, empresaId);

    // Verifica se já existe uma categoria com o nome fornecido
    const categoriaExistente = await this.existsByName(dados.nome, empresaId);
    if (categoriaExistente && categoriaExistente._id.toString() !== id) {
      throw new Error("Já existe uma categoria com esse nome.");
    }

    // Atualiza os dados da categoria
    categoria.nome = dados.nome || categoria.nome;
    return await categoria.save();
  }

  // Método para excluir uma categoria
  async deletarCategoria(id, empresaId) {
    const categoria = await this.getCategoriaPorId(id, empresaId);
    return await this.delete(categoria._id);
  }
}

module.exports = new CategoriaService();