const ArmazemBaseService = require('./ArmazemBaseService');
const ArmazemModel = require('../models/Armazem');

class ArmazemService extends ArmazemBaseService {
  constructor() {
    super(ArmazemModel);
  }

  // Método para criar um armazém vinculado à empresa autenticada
  async criarArmazem(dados, empresaId) {
    // Adiciona o ID da empresa no corpo do armazém antes de criar
    dados.empresa = empresaId;

    // Cria o armazém com os dados fornecidos
    return await this.create(dados);
  }

  // Método para obter todos os armazéns da empresa autenticada
  async getArmazensPorEmpresa(empresaId) {
    return await this.model.find({ empresa: empresaId });
  }

  // Método para editar o armazém
  async editarArmazem(id, dados) {
    return await this.update(id, dados);
  }

  // Método para obter um armazém por ID
  async getArmazemPorId(id) {
    const armazem = await this.getById(id);
    if (!armazem) {
      throw new Error("Armazém não encontrado");
    }
    return armazem;
  }
}

module.exports = new ArmazemService();